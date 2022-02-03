import * as b from "bobril";
import { observable, computed } from "bobx"
import * as Icon from "bobwai--icon";
import * as Color from "bobwai--color";
import * as Chat from "bobwai--chat";
import { Chat as ChatBox, IToString } from "bobwai--chat";
import { itemsSimple } from "./sidebar";
import { LMainContent } from "bobwai--l-main-content";
import { useState } from "bobril";

export const iconMdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, Color.Application));

// všechno, čemu se mění hodnota, odsud až po tu komponentu musí být nějak definované v rámci životního cyklu té komponenty. Takhle je to imo strašně nepřehledné náchylné na chybu.

let commentValue = "";

const labels = {
    submit: "Submit",
    reply: "Reply",
    label: "Chat",
    cancel: "Cancel",
    edit: "Edit",
    removeComment: "Delete",
    ok: "okay",
}

var model1: Chat.IComment<number>[] = [
]

var activeChat = localStorage['activeChat'];
var toBeParsed = localStorage[`chatLogs.${activeChat}`];
if (toBeParsed != undefined) {
    console.log(JSON.parse(toBeParsed));
    model1 = JSON.parse(toBeParsed);
}

const defaultRootCommentId = -1

let lastId1 = 8;
//let activeCommentId = -1;
//let activeCommentId2 = -1;

function showChatName() {
    if (activeChat != undefined) {
        return itemsSimple[activeChat-1].title;
    }
}

export function generateId(): number {
    return Math.round(Math.random() * new Date().getMilliseconds());
}

interface IData {}

// takhle to nepujde použít správně jako komponenta. Jako parametr tam musí být jenom data, takže by to mělo vypadat spíš data:{items: Chat.IComment<number>[]}
function MessageConstructor(items: Chat.IComment<number>[]): b.IBobrilChild{
    // chat a activeCommentId2 mi přijdou hned na první pohled divný, protože jejich hodnoty se nikde nepoužívají.
    const [chat, setChat] = b.useState("");
    const [activeCommentId, setActiveCommentId] = useState(-1);
    const [activeCommentId2, setActiveCommentId2] = useState(-1)

    return (
    <LMainContent>
    <text>{showChatName()}</text>
    <ChatBox 
    labels={labels}
    comments={model1}
    activeCommentId={activeCommentId}
    icon={iconMdComment} 
    defaultRootCommentId={-1} 
    activeCommentValue={commentValue}
    onChangeActiveCommentValue={function (text: string) {
        commentValue = text;
        setChat(text);
    }}
    onChangeActiveCommentId={function (id): void {
        setActiveCommentId(id);
    } } 
    onActiveCommentSubmit={function (parentCommentId, text: string): void {
        if (parentCommentId !== defaultRootCommentId) {
        // celý tenhle blok je zbytečný, ne? foreach je porovná hodnoty a push je do vyfiltrovaného pole, který se stejně zahodí.
            model1.forEach((c) => c.id === parentCommentId)
            model1
                .filter((c) => c.id === parentCommentId)[0]
                .replies.push({
                    id: generateId(),
                    text: text,
                    userName: "Cloud Administrator",
                    icon: iconMdComment,
                    created: "01 December",
                    isEditable: true,
                    replies: [],
                })
        } else {
            model1.forEach((c) => (c.isScrolledTo = false));
            model1.push({
                id: lastId1++,
                text: text,
                isEditable: true,
                userName: "John Doe",
                icon: iconMdComment,
                created: "01 December",
                replies: [],
                isScrolledTo: true,
            })
        }

        // tohle nic nedělá. Pokud potřebuješ něco v komponentě focusovat, ale komponenta ti to přímo neumožňuje, tak se to musí dodělat uvnitř té komponenty, ne to ohýbat.
        const element = document.getElementById("someId");
        if (element) {
            element.focus();
            console.log("element focused");
        }
        localStorage[`chatLogs.${activeChat}`] = JSON.stringify(model1);

    } }
    onEditComment={function (commentId, value, parentId):void {
        if (parentId !== undefined) {
            model1.filter((c) => c.id === parentId)[0].replies.slice(-1)[0].text=value;
        } else {
            model1.filter((c) => c.id === commentId)[0].text = value;
        }

        setActiveCommentId(-1);
    }}
    //FIXME: deleting comments seems funky
    onDeleteComment={function (commentId): void {
        // tohle se mi zdá složitý. Když máš id, tak bys měl najít ten comment pomocí find metody (něco jako v else bloku, akorát bez indexu)
        if (!model1.filter((c) => c.id === commentId)[0]) {
            for (let i = 0; i < model1.length; i++) {
                if (model1[i] && model1[i].replies.filter((c) => c.id === commentId)[0]) {
                    model1[i].replies.pop();
                }
            }
        } else {
            delete model1[model1.findIndex((c) => c.id === commentId)];
        }

        // uplně nerozumím proč zrovna -2
        setActiveCommentId2(-2);
    }}
    onCancelComment={function (): void {
        setActiveCommentId(-1);
    }}
    />
    </LMainContent>
    )
}

localStorage[`chatLogs.${activeChat}`] = JSON.stringify(model1);

export const ChatBoxComponent = () => MessageConstructor(model1)
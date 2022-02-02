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

function MessageConstructor(items: Chat.IComment<number>[]): b.IBobrilChild{
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
        if (!model1.filter((c) => c.id === commentId)[0]) {
            for (let i = 0; i < model1.length; i++) {
                if (model1[i] && model1[i].replies.filter((c) => c.id === commentId)[0]) {
                    model1[i].replies.pop();
                }
            }
        } else {
            delete model1[model1.findIndex((c) => c.id === commentId)];
        }

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
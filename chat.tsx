import * as b from "bobril";
import * as Icon from "bobwai--icon";
import * as Color from "bobwai--color";
import * as Chat from "bobwai--chat";
import { Chat as ChatBox, IToString } from "bobwai--chat";
import { LMainContent } from "bobwai--l-main-content";
import { useState } from "bobril";
import Avatar from "bobwai--avatar";

export const iconMdComment = b.styledDiv(null, b.sprite(Icon.user_medium_png, Color.Application));

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

const defaultRootCommentId = -1

let lastId1 = 8;



export function generateId(): number {
    return Math.round(Math.random() * new Date().getMilliseconds());
}

interface IData {}

interface IActiveChat {
    activeChat: string,
    setActiveChat: Function
}

export function ChatBoxComponent(data: IActiveChat) {
    const [activeCommentId, setActiveCommentId] = useState(-1);
    const [commentValue, setCommentValue] = useState("");

    let toBeParsed = localStorage[`chatLogs.${data.activeChat}`];
    if (toBeParsed != undefined) {
        console.log(JSON.parse(toBeParsed));
        model1 = JSON.parse(toBeParsed);
    }

    return (
    <LMainContent>
    <ChatBox 
    labels={labels}
    comments={model1}
    activeCommentId={activeCommentId}
    icon={iconMdComment} 
    defaultRootCommentId={-1} 
    activeCommentValue={commentValue}
    onChangeActiveCommentValue={(text: string) => {
        setCommentValue(text);
    }}
    onChangeActiveCommentId={(id): void => {
        setActiveCommentId(id);
    } } 
    onActiveCommentSubmit={(parentCommentId, text: string): void => {
        if (parentCommentId !== defaultRootCommentId) {
            model1
                .filter((c) => c.id === parentCommentId)[0]
                .replies.push({
                    id: generateId(),
                    text: text,
                    userName: "Cloud Administrator",
                    icon: <Avatar />,
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
                icon: <Avatar />,
                created: "01 December",
                replies: [],
                isScrolledTo: true,
            })
        }
        localStorage[`chatLogs.${data.activeChat}`] = JSON.stringify(model1);

    } }
    onEditComment={(commentId, value, parentId):void => {
        if (parentId !== undefined) {
            model1.filter((c) => c.id === parentId)[0].replies.slice(-1)[0].text=value;
        } else {
            model1.filter((c) => c.id === commentId)[0].text = value;
        }

        setActiveCommentId(-1);
    }}
    //FIXME: deleting comments seems funky
    onDeleteComment={(commentId): void => {
        if (!model1.filter((c) => c.id === commentId)[0]) {
            for (let i = 0; i < model1.length; i++) {
                if (model1[i] && model1[i].replies.filter((c) => c.id === commentId)[0]) {
                    model1[i].replies.pop();
                }
            }
        } else {
            delete model1[model1.findIndex((c) => c.id === commentId)];
        }

    }}
    onCancelComment={(): void => {
        setActiveCommentId(-1);
    }}
    />
    </LMainContent>
    )
}
import * as b from "bobril";
import Avatar from "bobwai--avatar";
import * as BChat from "bobwai--chat";
import { Chat } from "bobwai--chat";
import { IProfile } from ".";


const labels = {
    submit: "Submit",
    reply: "Reply",
    label: "Chat",
    cancel: "Cancel",
    edit: "Edit",
    removeComment: "Delete",
    ok: "okay",
}

interface IData {
    activeChat: IProfile | undefined,
    currentUser: IProfile | undefined
}

export function ChatBox(data: IData): b.IBobrilNode {
    const [commentId, setCommentId] = b.useState(0);
    const [parentId, setParentId] = b.useState(undefined);
    const [activeComment, setActiveComment] = b.useState("");
    const [comments, setCommentValue] = b.useState<BChat.IComment<number>[]>([]);

    let queryMessages = localStorage[`chatLogs.${data.activeChat?.id}`]
    if (queryMessages !== undefined){
        setCommentValue(JSON.parse(queryMessages));
    }

    let tmpComments: BChat.IComment<number>[] = comments;

    return(
        <Chat 
            labels={labels} 
            comments={comments}
            activeCommentId={commentId}
            icon={<Avatar imageSrc="https://www.w3schools.com/html/img_girl.jpg" />} 
            defaultRootCommentId={0} 
            onChangeActiveCommentId={(commentId): void => {
                setCommentId(commentId);
            } } 
            activeCommentValue={activeComment} 
            onChangeActiveCommentValue={(value: string): void => {
                setActiveComment(value);
            } } 
            onActiveCommentSubmit={(parentId, text: string): void => {
                    comments.forEach((c) => (c.isScrolledTo = false));
                    tmpComments.push({
                        id: new Date().getTime(),
                        text: text,
                        isEditable: true,
                        userName: data.currentUser!.username,
                        icon: <Avatar imageSrc={data.currentUser?.profilePicture} />,
                        created: `${new Date().getDay()}`,
                        replies: [],
                        isScrolledTo: true,
                    })
                    setCommentValue(tmpComments);
                localStorage[`chatLogs.${data.activeChat?.id}`] = JSON.stringify(comments);
            } } 
            onEditComment={(selectedCommentId, value): void => {
                tmpComments[tmpComments.findIndex(c => c.id === selectedCommentId)].text = value;
                setCommentValue(tmpComments);
                localStorage[`chatLogs.${data.activeChat?.id}`] = JSON.stringify(comments);
                setActiveComment("");
                setCommentId(0);
            } }
            onDeleteComment={(selectedCommentId): void => {
                const commentIndex = comments.findIndex(c => c.id === selectedCommentId);
                comments.splice(commentIndex, 1);

                localStorage[`chatLogs.${data.activeChat?.id}`] = JSON.stringify(comments);
            }}  />
    )
}
import * as b from "bobril";
import { Sidebar } from "bobwai--sidebar";
import { Background, ViewerContainer } from "bobwai--viewer-container";
import * as SidebarItem from "bobwai--sidebar-item";
import Avatar from "bobwai--avatar";
import * as Color from "bobwai--color";
import { useEffect, useState } from "bobril";
import { Filter } from "bobwai--filter";

interface IActiveChat {
    activeChat: string,
    setActiveChat: Function
}

function getFriendList(group: SidebarItem.IData[], filterValue: string): b.IBobrilChildren {
    const friends: b.IBobrilChildren = [];

    if(filterValue == ""){
        group.forEach(element => {
            friends.push(SidebarItem.create(element));
        });
    } else {
        group.forEach(element => {
            if (element.title.toLowerCase().includes(filterValue))
                friends.push(SidebarItem.create(element))
        })
    }

    return friends;
}

export function useActiveChat(){
    const [activeChat, setActiveChat] = useState("");
    
    useEffect(() => {
        function handleChatChange(item: SidebarItem.IData){
            setActiveChat(item.id);
        }
    })

    return activeChat
}

export function ApplicationSidebar(data: IActiveChat) {
    const [filterValue, setFilterValue] = useState("");

    const onClickSimple = (item: SidebarItem.IData): boolean => {
        data.setActiveChat(item.id);
        return true;  
    };

    const itemsSimple: SidebarItem.IData[] = [
        { id: "1", title: "Hans Becker", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Purple100} /> },
        { id: "2", title: "Thomas Wood", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Blue300} /> },
        { id: "3", title: "Alen Green", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Violet300} /> },
        { id: "4", title: "Phill Barret", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Yellow300} /> },
    ];

    return(
        <>
            <Filter value={filterValue} 
            onChange={(value: string): void => {
                setFilterValue(value);
            } } onTextClear={(): void => {
                setFilterValue("");
            } }
            isOnChangeWithDelay={true} />
            <ViewerContainer withoutPadding background={Background.Transparent}>
                <Sidebar>
                    {getFriendList(itemsSimple, filterValue)}
                </Sidebar>
            </ViewerContainer>
        </>
    );
}
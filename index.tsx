import * as b from "bobril";
import { LApp } from "bobwai--l-app";
import { LViewSidebar, SidebarWidth } from "bobwai--l-view-sidebar";
import { LViewMain } from "bobwai--l-view-main";
import Avatar from "bobwai--avatar";
import { Filter } from "bobwai--filter";
import { EmptyState } from "bobwai--empty-state";
import { ApplicationSidebar, useActiveChat } from "./sidebar";
import { ChatBoxComponent } from "./chat";
import { Label, Size } from "bobwai--label";

function Main() {
    const [filterValue, setFilterValue] = b.useState("");
    const [activeChat, setActiveChat] = b.useState("");

    function EmptyStateCheck(): b.IBobrilChild {
        if (activeChat == "") {
            return <EmptyState message={"No chat chosen"} />
        } else {
            return <ChatBoxComponent activeChat={activeChat} setActiveChat={setActiveChat} />;
        }
    }

    return (
        <LApp>
            <LViewSidebar width={SidebarWidth.Medium} >
                    <Avatar size={100} />
                    <Label isSimple size={Size.Medium}> John Mitchell</Label>
                <ApplicationSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
            </LViewSidebar> 
            <LViewMain isCombinedWithSidebar sidebarWidth={SidebarWidth.Medium}>
                {EmptyStateCheck()}
            </LViewMain>
        </LApp>
    )
}

b.init(() => <Main />);
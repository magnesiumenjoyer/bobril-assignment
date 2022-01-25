import * as b from "bobril";
import { LApp } from "bobwai--l-app";
import { LViewSidebar, SidebarWidth } from "bobwai--l-view-sidebar";
import { LViewMain } from "bobwai--l-view-main";
import Avatar from "bobwai--avatar";
import { Filter } from "bobwai--filter";
import { EmptyState } from "bobwai--empty-state";
import { ApplicationSidebar } from "./sidebar";
import { ChatBoxComponent } from "./chat";

var isChatOpen = false;
var filterValue = "";

function emptyStateCheck() {
    if (localStorage['activeChat'] == undefined) {
        return <EmptyState message={"No chat chosen"} />
    } else {
        return ChatBoxComponent();
    }
}

class Main extends b.Component {
    render(): b.IBobrilChildren {
        return (
            <>
                <LApp>
                    <LViewSidebar width={SidebarWidth.Medium} >
                            <Avatar size={100} />
                            <text> John Mitchell</text>
                            <Filter value="" 
                            onChange={function (value: string): void {
                                filterValue = value;
                                localStorage['filterValue'] = filterValue;
                                b.invalidate();
                            } } onTextClear={function (): void {
                                filterValue = "";
                                b.invalidate()
                            } }
                            isOnChangeWithDelay={true} />
                        <ApplicationSidebar />
                    </LViewSidebar> 
                    <LViewMain isCombinedWithSidebar sidebarWidth={SidebarWidth.Medium}>
                        {emptyStateCheck()}
                    </LViewMain>
                </LApp>
            </>
        )
    }
}

b.init(() => <Main />);
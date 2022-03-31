import * as b from "bobril";
import * as Color from "bobwai--color";
import { LApp } from "bobwai--l-app";
import { LViewMain } from "bobwai--l-view-main";
import { LViewSidebar, SidebarWidth } from "bobwai--l-view-sidebar";
import { LContentWithHeader } from "bobwai--l-content-with-header";
import { LMainContent } from "bobwai--l-main-content";
import { Sidebar } from "./sidebar";
import { ChatBox } from "./chat";
import { Label, Size } from "bobwai--label";
import Avatar from "bobwai--avatar";
import { EmptyState } from "bobwai--empty-state";
import { Filter } from "bobwai--filter";

export interface IProfile {
    id: number,
    username: string,
    profilePicture: string
}

function App(): b.IBobrilNode {
    const [activeChat, setActiveChat] = b.useState<IProfile | undefined>(undefined);
    const [currentUser, setCurrentUser] = b.useState<IProfile | undefined>({id: 1, username: "John Doe", profilePicture: "https://www.w3schools.com/html/img_girl.jpg"});
    const [filterValue, setFilterValue] = b.useState("");

    function FriendQuickOverview(): b.IBobrilNode {
        return(
            <>
                <Avatar imageSrc={activeChat?.profilePicture} size={50} /> 
                <Label children={activeChat?.username} isSimple size={Size.Medium} />
            </>
        )
    }
    

    return(
        <LApp>
            <LViewSidebar width={SidebarWidth.Medium}>
                <LMainContent background={Color.Grey000}>
                    <Avatar imageSrc={currentUser?.profilePicture} size={100} />
                    <Label children={currentUser?.username} isSimple size={Size.Medium} />
                    <Filter 
                        onTextClear={(): void => { setFilterValue(""); } } 
                        onChange={function (value: string): void {setFilterValue(value);} } 
                    />
                    <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} filterValue={filterValue} />
                </LMainContent>
            </LViewSidebar>
            <LViewMain isCombinedWithSidebar sidebarWidth={SidebarWidth.Medium}>
                <LContentWithHeader headerContent={!activeChat? "" : <FriendQuickOverview />}>
                    {!activeChat? <EmptyState message="No chat chosen..." /> : <ChatBox activeChat={activeChat} currentUser={currentUser} />}
                </LContentWithHeader>
            </LViewMain>
        </LApp>
    );
}

b.init(() => <App />);
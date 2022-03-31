import * as b from "bobril";
import { IProfile } from ".";
import { Background, ViewerContainer } from "bobwai--viewer-container";
import { SidebarItem, IData as ISidebarItem} from "bobwai--sidebar-item";

interface IActiveChat {
    activeChat: IProfile | undefined,
    setActiveChat: Function,
    filterValue: string
}

export function Sidebar(data: IActiveChat): b.IBobrilNode{

    const TestFriends: ISidebarItem[] = [
        { id: "1", title: "Dummy1", onClick: () => data.setActiveChat({id: 1, username: "Dummy1", profilePicture: "https://img-9gag-fun.9cache.com/photo/a3Q5VW5_460s.jpg"}) },
        { id: "2", title: "Dummy2", onClick: () => data.setActiveChat({id: 2, username: "Dummy2", profilePicture: "https://img-comment-fun.9cache.com/media/aZLoAK3/a0N96pE6_700w_0.jpg"}) },
        { id: "3", title: "Dummy3", onClick: () => data.setActiveChat({id: 3, username: "Dummy3", profilePictuer: "https://img-comment-fun.9cache.com/media/aZn16z/aDVakxox_700w_0.jpg"}) }
    ];
    
    function getFriendList(group: ISidebarItem[]): b.IBobrilChildren {
        const friends: b.IBobrilChildren = [];
    
        if (data.filterValue === "") {
            return group.map(group => <SidebarItem {...group} />);
        } else {
            return group.filter(g => g.title.toLocaleLowerCase().includes(data.filterValue.toLocaleLowerCase())).map(g => <SidebarItem {...g} />);
        }
    
        return friends;
    }

    return(
        <ViewerContainer background={Background.Transparent} withoutPadding>
            {getFriendList(TestFriends)}
        </ViewerContainer>
    );
}
import * as b from "bobril";
import * as Sidebar from "bobwai--sidebar";
import * as Container from "bobwai--viewer-container";
import * as SidebarItem from "bobwai--sidebar-item";
import Avatar from "bobwai--avatar";
import * as Color from "bobwai--color";

//TODO: Maybe change the chat selection so it doesn't have to reload
const onClickSimple = (item: SidebarItem.IData): boolean => {
    setActiveItem(subitems, "-1");
    setActiveItem(itemsSimple, item.id);
    localStorage['activeChat'] = item.id;
    // počítám, že to má být single page application, takže reload nechceme dělat.
    document.location.reload();
    return true;
};

// není použité
const onClickCollapsible = (item: SidebarItem.IData): boolean => {
    item.isExpanded = !item.isExpanded;
    return true;
};

const onClickSubitem = (item: SidebarItem.IData): boolean => {
    setActiveItem(itemsSimple, "-1");
    setActiveItem(subitems, item.id);
    return true;
};

function setActiveItem(source: SidebarItem.IData[], id: string): void {
    // imo by id aktivního by mělo být v komponentě jako state a kontrolovat to přímo v renderu
    source.forEach((item: SidebarItem.IData) => {
        item.isActive = item.id === id;
    });
}

// tohle mi přijde divné. Spíš by ty data měly být zapsané přímo v komponentě a pokud potřebuješ měnit isActive, tak to měnit přímo tam.
export const itemsSimple: SidebarItem.IData[] = [
    { id: "1", title: "Hans Becker", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Purple100} /> },
    { id: "2", title: "Thomas Wood", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Blue300} /> },
    { id: "3", title: "Alen Green", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Violet300} /> },
    { id: "4", title: "Phill Barret", onClick: onClickSimple, iconContent: <Avatar color={Color.Chart_Yellow300} /> },
];

const subitems: SidebarItem.IData[] = [
    {
        id: "4",
        title:
            "Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4Subitem 4",
        onClick: onClickSubitem,
        size: SidebarItem.size.Small,
        isSubitem: true,
    },
    { id: "5", title: "Subitem 5", onClick: onClickSubitem, size: SidebarItem.size.Small, isSubitem: true },
];

// není použité
function friendListFilter(filterValue: string): SidebarItem.IData[] {
    var count: number = -1;
    itemsSimple.forEach(function (value) {
        count++;
        console.log(value.title)
        if (filterValue.toLocaleLowerCase() == value.title.toLocaleLowerCase()) {
            return SidebarItem.create(itemsSimple[count]);
        } else if (filterValue == "") {
            return ;
        }
    });
    return itemsSimple;
}

export class ApplicationSidebar extends b.Component {
    render(): b.IBobrilChildren {
        // 💄 nemusíš vracet pole, protože je v něm jen jeden item.
        // Container i SidebarItem-y by měly být zapsané pomocí TSX
        return [
            Container.create({
                background: Container.Background.Transparent,
                withoutPadding: true,
                content: Sidebar.create({}, [
                    // friendListFilter(localStorage['filterValue'])
                    SidebarItem.create(itemsSimple[0]),
                    SidebarItem.create(itemsSimple[1]),
                    SidebarItem.create(itemsSimple[2]),
                    SidebarItem.create(itemsSimple[3]),
                ]),
            }),
        ];
    }
}
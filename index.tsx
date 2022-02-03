import * as b from "bobril";
import { LApp } from "bobwai--l-app";
import { LViewSidebar, SidebarWidth } from "bobwai--l-view-sidebar";
import { LViewMain } from "bobwai--l-view-main";
import Avatar from "bobwai--avatar";
import { Filter } from "bobwai--filter";
import { EmptyState } from "bobwai--empty-state";
import { ApplicationSidebar } from "./sidebar";
import { ChatBoxComponent } from "./chat";

// 💄 nepoužité
var isChatOpen = false;
// to by mělo být imo definované uvnitř Main komponnety, protože mimo se na nic nepoužívá. Navíc var na Impressu nepoužíváme, jen let nebo const.
var filterValue = "";

// 💄 chybí návratový typ. Protože to bude componenta, tak by název měl začínat velkým písmenem.
function emptyStateCheck() {
    if (localStorage['activeChat'] == undefined) {
        return <EmptyState message={"No chat chosen"} />
    } else {
        return ChatBoxComponent();
    }
}

// 💄 protože třída obsahuje jen render, tak bych použil function zápis komponenty.
class Main extends b.Component {
    render(): b.IBobrilChildren {
        return (
            // 💄 zbytečný fragment
            <>
                <LApp>
                    <LViewSidebar width={SidebarWidth.Medium} >
                            <Avatar size={100} />
                            <text> John Mitchell</text> {/* Používáme jen komponenty z galerky, takže tady bych použil Label */}
                            {/* Pokud nedělám něco špatně, tak tenhle filter nic nedělá. Imo by měl mít jako value nastavený filterValue, který mění při změně.  */}
                            <Filter value="" 
                            /* 💄 jako callbacky do komponent dáváme arrow funkce, spíš než function */
                            onChange={function (value: string): void {
                                filterValue = value;
                                // zase mi přijde, že to k ničemu není, protože se ta hodnota nikde nečte. Myslim, že by tady v rámci SPA nemusel ani být použitý localStorage, stačilo by, aby filterValue držel state.
                                localStorage['filterValue'] = filterValue;
                            } } onTextClear={function (): void {
                                filterValue = "";
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
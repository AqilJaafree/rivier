import { Img, Heading } from "./..";
import React from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function Sidebar4({ ...props }) {
    const [collapsed, setcollapsed] = React.useState(false);

    //use this function to collapse/expand the sidebar 
    //function collapsesidebar() [ 
    //setCollapsed(Icollapsed) 

    return (
        <Sidebar
            {...props}
            width="294px !important"
            collapsedWidth="80px !important"
            collapsed={collapsed}
            rootStyles={{
                ['.${sidebarClasses.container}']: { gap: 34 }
            }}
            className={'${props.className} flex flex-col self-end h-screen gap-[34px]top-0 !sticky overflow-auto'}
        >
            < div className="self-stretch" >
                <div className="flex items-start gap-2.5">
                    <Img src="images/img_luxi_hosting_logo.png" alt="Luxihosting" className="h-[30px] object-cover" />
                    <Heading size="heading4x1" as="h4" className="mt-1.5 self-end !font-montserrat text-[24px] font-semibold">
                        Crypto
                    </Heading>
                </div>
            </div >
            <Menu
                menuItemStyles={{
                    button: {
                        padding: "16px 16px 16px 24px",
                        gap: "19px",
                        color: "#dddddd",
                        fontweight: 500,
                        fontsize: "18px",
                        ['&: hover, &.ps - active']: { background: "linear-gradient(163.57deg, #1e8ebe, #430394,#430394, #b001cd)" },
                    },
                }}
                rootStyles={{ ["&>ul"]: { gap: "402px" } }}
                className="flex w-full flex-col self-stretch"
            >
                <div className="flex flex-col gap-1.5" >
                    <MenuItem
                        icon={<img src="images/img_icon_24_dasboard.svg" alt="Icontwentyfour" className="h-[24px] w-[24px]" />}
                        Dashboard
                    >
                    </MenuItem>
                    <MenuItem icon={<img src="images/img_icon_24_trade.svg" alt="Icon24trade" className="h-[24px] w-[24px]" />}>
                        WithDraw
                    </MenuItem>
                    <MenuItem icon={<img src="images/img_icon_24_donate.svg" alt="Icon24donate" className="h-[24px] w-[24px]" />}>
                        Deposits
                    </MenuItem>
                    <MenuItem
                        icon={<Img src="images/img_icon_24_protocols.svg" alt="Icontwentyfour" className="h-[24px] w-[24px]" />}
                    >
                        Buy Miner
                    </MenuItem>
                    <MenuItem
                        icon={<Img src="images/img_icon_24_setting.svg" alt="Icon24setting" className="h-[24px] w- [24px]" />}
                    >
                        Settings
                    </MenuItem>
                    <MenuItem icon={<Img src="images/img_icon_24_user.svg" alt="Icon24user" className="h-[24px] w-[24px]" />}>
                        Profile
                    </MenuItem>
                </div>
                <div>
                    <MenuItem icon={<Img src="images/img_logout_1_1.svg" alt="Logoutlone" className="h-[24px] w- [24px]" />}>
                        Log Out
                    </MenuItem>
                </div>
            </Menu >
        </Sidebar >
    );
}
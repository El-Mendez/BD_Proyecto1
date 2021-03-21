import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';


export default class sideBar extends React.Component{
    render(){
        return(
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem>Dashboard</MenuItem>
                    <SubMenu title="Components">
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
                <SidebarFooter>
                    {/**
                     *  You can add a footer for the sidebar ex: copyright
                     */}
                </SidebarFooter>
            </ProSidebar>
        );
    }
}

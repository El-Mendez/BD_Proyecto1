import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link, useRouteMatch } from 'react-router-dom';
import logo from '../../assets/zoabl.svg'
import {BsHouse as I_house,
    BsSearch as I_search,
    BsGrid1X2Fill as I_library,
    BsPlusSquareFill as I_newPlaylist} from 'react-icons/bs';


export default function sideBar(){

    let {url} = useRouteMatch();

        return(
            <ProSidebar>
                <SidebarHeader className={'d-flex justify-content-center'}>
                    <img src={logo} alt="Zoa Logo" className={'logo w-75'}/>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <MenuItem>
                            <Link to={'/home'}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_house/></span>
                                    Home
                                </p>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to={`${url}/search`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_search/></span>
                                    Search
                                </p>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to={`${url}/report`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_library/></span>
                                    Library
                                </p>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to={`${url}/playlist`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_newPlaylist/></span>
                                    Crear Playlist
                                </p>
                            </Link>
                        </MenuItem>

                    </Menu>
                </SidebarContent>

                <SidebarFooter>
                    {/*<p className={'sidebar-menuItem ml-4 my-4'}>*/}
                    {/*    <span className={'mr-3'}><I_user/></span>*/}
                    {/*    Username*/}
                    {/*</p>*/}
                </SidebarFooter>
            </ProSidebar>
        );
}

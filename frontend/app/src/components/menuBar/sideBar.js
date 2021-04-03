import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link, useRouteMatch, useParams} from 'react-router-dom';
import logo from '../../assets/zoabl.svg'
import {BsHouse as I_house,
    BsSearch as I_search,
    BsGrid1X2Fill as I_library,
    BsPlusSquareFill as I_newPlaylist} from 'react-icons/bs';
import CreatePlaylist from '../playlist/createPlaylist';


export default function sideBar(){

    let {url} = useRouteMatch();
     let { user } = useParams();
    const [modalShow, setModalShow] = React.useState(false);


        return(
            <ProSidebar>
                <SidebarHeader className={'d-flex justify-content-center'}>
                    <img src={logo} alt="Zoa Logo" className={'logo w-75'}/>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        {/* HOME */}
                        <MenuItem>
                            <Link to={`/home/${user}`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_house/></span>
                                    Home
                                </p>
                            </Link>
                        </MenuItem>
                        {/* SEARCH */}
                        <MenuItem>
                            <Link to={`${url}/search`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_search/></span>
                                    Search
                                </p>
                            </Link>
                        </MenuItem>
                        {/* LIBRARY */}
                        <MenuItem>
                            <Link to={`${url}/report`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'mr-3'}><I_library/></span>
                                    Library
                                </p>
                            </Link>
                        </MenuItem>
                        {/* CREATE PLAYLIST */}
                        <MenuItem>
                                <p className={'sidebar-menuItem'} onClick={() => setModalShow(true)}>
                                    <span className={'mr-3'}><I_newPlaylist/></span>
                                    Crear Playlist
                                </p>
                            <CreatePlaylist
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
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

import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import {BsFillPersonFill as I_person, BsCardText as I_info, BsPencil as I_pencil, BsCollectionFill,
        BsHouse as I_house} from 'react-icons/bs';
import logo from '../../assets/user.svg'
import './user.scss';
export default function userDescriptor () {
    let {url} = useRouteMatch();
    let { user } = useParams();
        return (
            <ProSidebar>
                <SidebarHeader className={'d-flex justify-content-center'}>
                    <img src={logo} className = 'usuario'></img>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<I_info />}>
                            <Link to={`${url}`}></Link>
                                Datos generales
                        </MenuItem>
                        <MenuItem icon={<I_pencil />}>
                            <Link to={`${url}/cambiar_datos`}></Link>
                                Cambiar datos
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="circle">
                        <MenuItem icon={<I_house />}>
                            <Link to={`/home/${user}`}>
                                Home
                            </Link>
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
            )
}


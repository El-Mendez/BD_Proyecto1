import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { BsCardText as I_info, BsPencil as I_pencil, BsHouse as I_house} from 'react-icons/bs';
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



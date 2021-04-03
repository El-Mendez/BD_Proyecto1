import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import {BsFillPersonFill as I_person, BsCardText as I_info, BsPencil as I_pencil, BsCollectionFill as I_edition} from 'react-icons/bs';
import logo from '../../assets/user.svg'
import './user.scss';
import EditSong from './editarCancion'
import EditAlbum from './editarAlbum.js'
import EditArtist from './editarArtista'
import DeleteSong from './eliminarCancion'
import DeleteArtist from './eliminarArtista'

export default function userView () {
    let {url} = useRouteMatch();
    const [modalShow, setModalShow] = React.useState(false);

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
                        <SubMenu title="Edicion de datos" icon = {<I_edition />}>
                            <MenuItem icon={<I_pencil />}>
                                <Link to={`${url}/editar_cancion`}></Link>
                                    Editar canción
                            </MenuItem>
                            <MenuItem icon={<I_pencil />}>
                                <Link to={`${url}/editar_album`}></Link>
                                    Editar album
                            </MenuItem>
                            <MenuItem icon={<I_pencil />}>
                                <Link to={`${url}/editar_artista`}></Link>
                                    Editar artista
                            </MenuItem>
                            <MenuItem icon={<I_pencil />}>
                            <div className={'sidebar-menuItem'} onClick={() => setModalShow(true)}>
                                    Eliminar canción
                                </div>
                                <DeleteSong
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </MenuItem>
                            <MenuItem icon={<I_pencil />}>
                            <div className={'sidebar-menuItem'} onClick={() => setModalShow(true)}>
                                    Editar Album
                                </div>
                                <EditAlbum
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </MenuItem>                         
                        </SubMenu>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
            )
        }
        {/* <Link to={`${url}/eliminar_artista`}></Link>
            Eliminar artista */}
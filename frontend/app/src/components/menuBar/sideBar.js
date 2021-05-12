import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link, useRouteMatch, useParams} from 'react-router-dom';
import Axios from 'axios';
import logo from '../../assets/zoabl.svg'
import {BsHouse as I_house,
    BsSearch as I_search,
    BsGrid1X2Fill as I_library,
    BsPlusSquareFill as I_newPlaylist,
    BsClipboardData as I_report,
    BsPencil as I_pencil,
    BsFilm as I_record} from 'react-icons/bs';
import CreatePlaylist from '../playlist/createPlaylist';


export default function sideBar(){

    let {url} = useRouteMatch();
    let { user } = useParams();
    const [modalShow, setModalShow] = React.useState(false);

    const get_user = 'http://3.135.234.254:3000/getUserDescription';
    const get_tasks = 'http://3.135.234.254:3000//getSpecificTaskMonitor';
    const [admin, setAdmin] = useState(false);
    const [premium, setPremium] = useState(false);
    const [tasks, setTasks] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        sixth: false,
        seventh: false,
        eighth: false,
    })

    let id_monitor = null;
    let monitor = false;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await Axios.post(get_user,
                  {
                    username: user
                })
                id_monitor = data[0].id_monitor;
                if (data[0].descripcion === 'Admin'){
                    setAdmin(true);
                    setPremium (true);
                }else if(data[0].descripcion === 'Premium' ){
                    setPremium(true);
                }
            }catch (e){
                console.log(e)
            }
        };
        fetchData();

        if(id_monitor !== null){
            monitor = true;
            const fetchTasks = async () => {
                try{
                    const { data } = await Axios.post(get_tasks,
                      {
                          id_monitor: id_monitor
                      })
                    if(data.includes(1)){
                        setTasks({
                            ...tasks,
                            first: true,
                        })
                    }else if(data.includes(2)){
                        setTasks({
                            ...tasks,
                            second: true,
                        })
                    }else if(data.includes(3)){
                        setTasks({
                            ...tasks,
                            third: true,
                        })
                    }else if(data.includes(4)){
                        setTasks({
                            ...tasks,
                            fourth: true,
                        })
                    }else if(data.includes(5)){
                        setTasks({
                            ...tasks,
                            fifth: true,
                        })
                    }else if(data.includes(6)){
                        setTasks({
                            ...tasks,
                            sixth: true,
                        })
                    }else if(data.includes(7)){
                        setTasks({
                            ...tasks,
                            seventh: true,
                        })
                    }else if(data.includes(8)){
                        setTasks({
                            ...tasks,
                            eighth: true,
                        })
                    }
                }catch (e){
                    console.log(e)
                }
            };
            fetchTasks();
        }
    })




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
                                    <span className={'me-3'}><I_house/></span>
                                    Home
                                </p>
                            </Link>
                        </MenuItem>
                        {/* SEARCH */}
                        <MenuItem>
                            <Link to={`${url}/search`}>
                                <p className={'sidebar-menuItem'}>
                                    <span className={'me-3'}><I_search/></span>
                                    Search
                                </p>
                            </Link>
                        </MenuItem>
                        {/* LIBRARY */}
                        {
                            premium? <MenuItem>
                                <Link to={`${url}/library`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_library/></span>
                                        Library
                                    </p>
                                </Link>
                            </MenuItem> : ''
                        }
                        {/* CREATE PLAYLIST */}
                        {
                            premium? <MenuItem>
                                <p className={'sidebar-menuItem'} onClick={() => setModalShow(true)}>
                                    <span className={'me-3'}><I_newPlaylist/></span>
                                    Crear Playlist
                                </p>
                                <CreatePlaylist
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                />
                            </MenuItem> : ''
                        }
                        {/* EDITION */}
                        {
                            admin? <MenuItem>
                                <Link to={`${url}/edition`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_pencil/></span>
                                        Edición
                                    </p>
                                </Link>
                            </MenuItem> :
                              monitor? <MenuItem>
                                <Link to={`${url}/edition`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_pencil/></span>
                                        Edición
                                    </p>
                                </Link>
                            </MenuItem>:
                              ''
                        }
                        {/* REPORTS */}
                        {
                            admin? <MenuItem>
                                <Link to={`${url}/report`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_report/></span>
                                        Reportes
                                    </p>
                                </Link>
                            </MenuItem> : tasks.seventh? <MenuItem>
                                <Link to={`${url}/report`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_report/></span>
                                        Reportes
                                    </p>
                                </Link>
                            </MenuItem>:
                              ''
                        }
                        {
                            admin? <MenuItem>
                                <Link to={`${url}/bitacora`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_record/></span>
                                        Bitácora
                                    </p>
                                </Link>
                            </MenuItem> :
                              tasks.eighth? <MenuItem>
                                <Link to={`${url}/bitacora`}>
                                    <p className={'sidebar-menuItem'}>
                                        <span className={'me-3'}><I_record/></span>
                                        Bitácora
                                    </p>
                                </Link>
                            </MenuItem>:
                                ''
                        }
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

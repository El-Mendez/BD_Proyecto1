import React, {Fragment, useState, useEffect} from 'react';
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import Axios from 'axios';
import Vista from './view'
import Info from './userInfo'
import Cambio from './cambioDatos'
import EditSong from './editarCancion'
import EditAlbum from './editarAlbum.js'
import EditArtist from './editarArtista'
import './user.scss';

export default function userDescriptor (props) {
    let {path} = useRouteMatch();
    const data = props
    return (
        <div className = "container"> 
            <div className="row position">  
            <Vista
            desc = {data.desc}
            />
            <Switch>
                <Route path={`${path}/cambiar_datos`}>
                    <Cambio/>
                </Route>
                <Route path={`${path}/editar_cancion`}>
                    <EditSong/>
                </Route>
                <Route path={`${path}/editar_album`}>
                    <EditAlbum/>
                </Route>
                <Route path={`${path}/editar_artista`}>
                    <EditArtist/>
                </Route>
                <Route path={`${path}`}>
                    <Info
                    username = {data.username}
                    nombres = {data.nombres}
                    apellidos = {data.apellidos}
                    desc = {data.desc}
                    correo = {data.correo}/>
                </Route>
          </Switch>  
            </div>
        </div>
        )
}
    {/* <Vista
    desc = {this.props.desc}
    />
    <div className="col info_Usuario"> 
        <Info
        username = {this.props.username}
        nombres = {this.props.nombres}
        apellidos = {this.props.apellidos}
        desc = {this.props.desc}
        correo = {this.props.correo}/>
    </div> */}
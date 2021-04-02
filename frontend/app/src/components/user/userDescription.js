import React, {Fragment, useState, useEffect} from 'react';
import Axios from 'axios';
import Vista from './view'
import userView from './userView'
import './user.scss';

export default class userDescriptor extends React.Component {
    render() {
        return (
            <div className = "container"> 
                <div className="row position">    
                    <Vista
                    desc = {this.props.desc}
                    />
                    <div className="col info_Usuario"> 
                        <div className="asd">
                            <div className="row">Nombres : {this.props.nombres}</div>
                            <div className="row">Apellidos: {this.props.apellidos}</div>
                            <div className="row">Nombre de usuario: {this.props.username}</div>
                            <div className="row">Correo: {this.props.correo}</div>
                            <div className="row">Tipo de cuenta: {this.props.desc}</div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
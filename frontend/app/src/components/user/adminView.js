import React, {Fragment, useState, useEffect} from 'react';
import './user.scss';
export default class userDescriptor extends React.Component {
    render() {
        return (
            <div className="col-4 opciones"> 
                <div className="texto_opciones">
                    <div className="row">Datos generales</div>
                    <div className="row">Información de canciones</div>
                </div>
            </div>
            )
    }
}
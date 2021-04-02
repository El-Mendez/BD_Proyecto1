import React, {Fragment, useState, useEffect} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './user.scss';
export default function userDescriptor () {
    let {url} = useRouteMatch();
        return (
            <div className="col-4 opciones"> 
                <div className="texto_opciones">
                    <div className="row">
                    <Link to={`${url}`}>
                        <div className={'sidebar-menuItem'}>
                        <span className={'mr-3'}></span>
                        Datos generales
                        </div>
                    </Link>
                    </div>
                    <div className="row">
                    <Link to={`${url}`}>
                        <div className={'sidebar-menuItem'}>
                        <span className={'mr-3'}></span>
                        Cambiar Datos
                        </div>
                    </Link>
                    </div>
                </div>
            </div>

            )
    
}
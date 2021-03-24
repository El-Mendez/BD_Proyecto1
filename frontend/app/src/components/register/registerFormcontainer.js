import React from 'react';
import Registerform from "./registerForm";
import logo from '../utils/zoaLogo.png'

export default function registerFormcontainer(){
    return(
        <div className={'form-container d-flex flex-column mb-5'}>
            <img src={logo} className={'align-self-center w-50'}/>
            <h4 className={'text-center font-weight-bold mt-3'}>Regístrate gratis para escuchar</h4>
            <span className={'divider'}>○</span>
            <Registerform/>
            <span className={'divider'}/>
            <p className={'text-center mb-0 mt-1'}>
                <span className={'mr-3'}>
                   ¿Ya tienes cuenta?
                </span>
                <a href={'../../index.html'}>Iniciar Sesión</a>
            </p>
        </div>
    )
}

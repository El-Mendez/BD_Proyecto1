import React from 'react';
import LogInform from "./logInform";
import Button from '../utils/button';
import logo from '../utils/zoaLogo.png'

export default function logInformContainer(){
        return(
            <div className={'form-container d-flex flex-column mt-5'}>
                <img src={logo} className={'align-self-center w-75'}/>
                <h6 className={'text-center'}>Inicia sesión y continua disfrutando</h6>
                <span className={'divider'}>○</span>
               <LogInform/>
               <span className={'divider'}/>
               <h5 className={'text-center mb-0 mt-3'}>¿No tienes una cuenta?</h5>
                <Button
                    btnClass = {'signIn-btn'}
                    btnName ={'REGÍSTRATE'}/>
            </div>
        )
}

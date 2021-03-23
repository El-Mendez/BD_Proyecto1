import React from 'react';
import LogInform from "./logInform";
import Button from '../utils/button';
import logo from '../utils/zoaLogo.png'
export default function logInformContainer(){
        return(
            <div className={'form-container d-flex flex-column'}>
                <img src={logo} className={'align-self-center'}/>
                <h6 className={'text-center'}>Inicia sesión y continua disfrutando</h6>
                <span className={'divider'}>○</span>
               <LogInform/>
               <hr/>
               <h4 className={'text-center'}>¿No tienes una cuenta?</h4>
                <Button
                    btnClass = {'signIn-btn'}
                    btnName ={'REGÍSTRATE'}/>
            </div>
        )
}

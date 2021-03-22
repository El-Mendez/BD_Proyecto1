import React from 'react';
import LogInform from "./logInform";
import Button from '../utils/button';
import test from '../utils/badLiar.jpg'
export default function logInformContainer(){
        return(
            <div className={'form-container'}>
                <img src={test}/>
                <h6 className={'text-secondary text-center'}>Inicia sesión y continua disfrutando</h6>
                <span className={'divider'}>○</span>
               <LogInform/>
               <hr/>
               <h4 className={'text-secondary text-center'}>¿No tienes una cuenta?</h4>
                <Button
                    btnClass = {'signIn-btn'}
                    btnName ={'REGÍSTRATE'}/>
            </div>
        )
}

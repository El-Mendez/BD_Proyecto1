import React from 'react';
import RegisterForm from "./registerForm";
import ButtonContainer from './buttonContainer';

export default class formContainer extends React.Component{
    render(){
        return(
            <div className={'container-fluid form-container'}>
                <h5 className={'text-center'}>Regístrate gratis para escuchar</h5>
                <ButtonContainer/>
                <span className={'divider'}>○</span>
                <RegisterForm></RegisterForm>
            </div>
        )
    }



}
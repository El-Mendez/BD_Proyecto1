import React from 'react';
import InputContainer from '../utils/input'
export default class registerForm extends React.Component{
    render(){
        return(
            <form className={'mt-5'}>
                <h6 className={'text-center'}>Regístrate con tu correo electrónico</h6>
               <InputContainer
                name = {'Correo electrónico'}/>
                <InputContainer
                    name = {'Contraseña'}/>
                <InputContainer
                    name = {'Nombre'}/>
                <InputContainer
                    name = {'Saber'}/>
            </form>
        )
    }
}
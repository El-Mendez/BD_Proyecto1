import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Button from "../utils/button";
import {BsFillExclamationCircleFill as Exclamation_icon} from 'react-icons/bs';
import verificarUsuario from "../../conexionBD/checkUser";

 export default function logInform (){

     //Hook-Form validation
     const {register, errors, handleSubmit} = useForm({mode: 'onChange'});

     //State variables
     const [data, setData] = useState({
         email:'',
         password:''
     })

     const [filled, setFilled] = useState({
         email: false,
         password: false
     });

    const handleInputChange = (e) =>{
         console.log(e.target.value);
         setData({
             ...data,
             [e.target.name]:e.target.value,
         })

         if(e.target.value != ''){
            setFilled({
                ...filled,
             [e.target.name]: true
            });
         }else{
             setFilled({
                 ...filled,
                 [e.target.name]: false
             });
         }
    }

    const onSubmit = (data) =>{
        console.log(data)
    }

    return(
       <Fragment>
           <form onSubmit={handleSubmit(onSubmit)} >
               <div className={'position-relative mt-2'}>
                   <input className={"input " + (filled.email? 'is-filled':' ')}
                          type={'email'}
                          name={'email'}
                          onChange={handleInputChange}
                          ref={
                              register({
                                  required:{
                                      value: true,
                                      message: 'Es necesario que ingreses tu correo electrónico'
                                  },
                                  pattern:{
                                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      message: 'Ingresa un correo electrónico válido. Con un formato como el siguiente: ejemplo@email.com'
                                  }
                              })
                          }
                   />
                   <label className={'label'}>Correo electrónico</label>
                   <span className="text-danger text-small d-block mb-2">
                       <Exclamation_icon/>
                        {errors?.email?.message}
                   </span>
               </div>
               <div className={'position-relative mt-2'}>
                   <input className={'input ' + (filled.password? 'is-filled':' ')}
                          type={'password'}
                          name={'password'}
                          onChange={handleInputChange}
                   />
                   <label className={'label'}>Contraseña</label>
                   <Button
                       btnClass = {'logIn-btn'}
                       btnName ={'INICIAR SESIÓN'}/>
               </div>
           </form>
       </Fragment>
    );
}

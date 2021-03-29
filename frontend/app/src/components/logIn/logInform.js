import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import {BsFillExclamationCircleFill as Exclamation_icon} from 'react-icons/bs';
import { createBrowserHistory as history } from 'history';



 export default function logInform (){

     //Hook-Form validation
     const {register, errors, handleSubmit} = useForm({mode: 'onChange'});

     //State variables
     const [data, setData] = useState({
         username:'',
         password:''
     })

     const [filled, setFilled] = useState({
         username: false,
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
      console.log(history().location);
      history().push('/dashboard');
      history().go();
      console.log(history().location);
    }


    return(
       <Fragment>
           <form onSubmit={handleSubmit(onSubmit)} >
               <div className={'position-relative mt-2'}>
                   <input className={"input " + (filled.username? 'is-filled':' ')}
                          type={'text'}
                          name={'username'}
                          onChange={handleInputChange}
                          ref={
                              register({
                                  required:{
                                      value: true,
                                      message: 'Ingresa tu usuario'
                                  },
                              })
                          }
                   />
                   <label className={'label'}>Usuario</label>
                   <small className="text-danger text-small d-block mb-2">
                       {/*<Exclamation_icon/>*/}
                        {errors?.username?.message}
                   </small>
               </div>
               <div className={'position-relative mt-2'}>
                   <input className={'input ' + (filled.password? 'is-filled':' ')}
                          type={'password'}
                          name={'password'}
                          onChange={handleInputChange}
                          ref={
                              register({
                                  required:{
                                      value: true,
                                      message: 'Ingresa tu contraseña'
                                  },
                              })
                          }
                   />
                   <label className={'label'}>Contraseña</label>
                   <small className="text-danger text-small d-block mb-2">
                       {/*<Exclamation_icon/>*/}
                       {errors?.password?.message}
                   </small>
                   <button
                       onSubmit={onSubmit}
                       className={`btn logIn-btn my-3`}>
                       INICIAR SESIÓN
                   </button>
               </div>
           </form>
       </Fragment>
    );
}

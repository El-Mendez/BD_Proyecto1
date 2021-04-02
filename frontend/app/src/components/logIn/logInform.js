import React, {Fragment, useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { createBrowserHistory as history } from 'history';
import Axios from 'axios';



 export default function logInform (){
   //Api
   const get_user = 'http://3.135.234.254:3000/login/'

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

   function getUser(){
     console.log("Loading...");
     const fetchData = async (username, contrasena) => {
       try {
         const { data } = await Axios.post(get_user,
           {
               username,
               contrasena
           }
         );
         console.log('data '+ data.length);
         if(data.length === 1){
           console.log('just testing')
           console.log(history().location);
           history().push('/home');
           history().go();
           console.log(history().location);
         }else{
           alert('Usuario o contraseña incorrectos');
         }
       } catch (error) {
         console.log(error);
       }
     };
     fetchData(data.username, data.password);
   };


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

    const onSubmit = () =>{
      getUser();
    }


    return(
       <Fragment>
           <form onSubmit={handleSubmit(onSubmit)} >
               <div className={'position-relative mt-2'}>
                   <input className={'input ' + (filled.username? 'is-filled':' ')}
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
                       className={'btn btn-zoa purple-btn my-3 w-50'}>
                       INICIAR SESIÓN
                   </button>
               </div>
           </form>
       </Fragment>
    );
}

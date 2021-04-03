import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
export default function editArtist (){

    const post_user = 'http://3.135.234.254:3000/updateData';

    //Hook-Form validation
    const {register, errors, handleSubmit} = useForm({mode: 'onChange'});

    //State variables
    const [changeData, setchangeData] = useState({
        user_name: '',
        lastname: ''
    })

    const [registerFilled, setRegisterfilled] = useState({
        user_name: false,
        lastname: false
    });

    const handleInputChange = (e) =>{
        console.log(e.target.value);
        setchangeData({
            ...changeData,
            [e.target.name]:e.target.value,
        })

        if(e.target.value != ''){
            setRegisterfilled({
                ...registerFilled,
                [e.target.name]: true
            });
        }else{
            setRegisterfilled({
                ...registerFilled,
                [e.target.name]: false
            });
        }
    }

     function updateData(nombres, apellidos, username, ){
         try{
             const data ={
                 nombres: nombres,
                 apellidos: apellidos,
                 username: username, 
             };
     
              fetch(post_user, {
                  method: 'POST', // or 'PUT'
                  body: JSON.stringify(data), // data can be `string` or {object}!
                  headers:{
                      'Content-Type': 'application/json'
                  }
              }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => console.log('Success:', response));
         }catch(e){
             alert ('Ha ocurrido un fallo')
         }
    }

    const onSubmit = (data) =>{
        //console.log(data)
        try{
            updateData(changeData.user_name, changeData.lastname, 'Osberto');
        }catch(e){
            alert ('Ha ocurrido un fallo')
        }
        console.log(changeData.user_name, changeData.lastname);
    }

    const handleClick = () => {
        console.log('testing')

    }

    function getSong (){
        fetch(get_song)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return(
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="form col">
                <p>Ingresa los datos para editar a un artista</p>
                {/*NOMBRE*/}
                <div className={'position-relative mt-2'}>
                    <input className={"input " + (registerFilled.user_name? 'is-filled':' ')}
                           type={'text'}
                           name={'user_name'}
                           onChange={handleInputChange}
                           ref={
                               register({
                                   required:{
                                       value: true,
                                       message: 'Ingresa tu nombre'
                                   },
                               })
                           }
                    />
                    <label className={'label'}>Nombre</label>
                    <small className="text-danger text-small d-block mb-2">
                        {/*<Exclamation_icon/>*/}
                        {errors?.user_name?.message}
                    </small>
                </div>
                {/*APELLIDOS*/}
                <div className={'position-relative mt-2'}>
                    <input className={"input " + (registerFilled.lastname? 'is-filled':' ')}
                           type={'text'}
                           name={'lastname'}
                           onChange={handleInputChange}
                           ref={
                               register({
                                   required:{
                                       value: true,
                                       message: 'Ingresa tu apellido'
                                   },
                               })
                           }
                    />
                    <label className={'label'}>Apellido</label>
                    <small className="text-danger text-small d-block mb-2">
                        {/*<Exclamation_icon/>*/}
                        {errors?.lastname?.message}
                    </small>
                </div>
                {/*REGISTER BUTTON*/}
                <button onSubmit={onSubmit} className={`btn btn-zoa purple-btn my-3 w-100`}>Cambiar datos</button>
            </form>
        </Fragment>
    );
}

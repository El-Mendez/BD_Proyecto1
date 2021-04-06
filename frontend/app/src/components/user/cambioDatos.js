import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
export default function registerForm (props){

    const post_user = 'http://3.135.234.254:3000/updateData';
    let nuevoNombre = "";
    let nuevoApellido = "";

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

    const handleInputName= (e) =>{
        console.log(e.target.value);
        nuevoNombre = e.target.value
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
    const handleInputLastName= (e) =>{
        console.log(e.target.value);
        nuevoApellido = e.target.value
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
    
    const onSubmit = () =>{
        updateData();
    }
     function updateData(){
        console.log (nuevoNombre, nuevoApellido, props.username)
        const fetchData = async () =>{
            try{
                const { data } = await Axios.post(post_user,
                  {
                    nombres: nuevoNombre,
                    apellidos: nuevoApellido,
                    username: props.username, 
                  }
                );
                alert("Cambio de datos realizado")
            } catch (error){
                console.log(error)
                alert("Datos incorrectos, recuerde introducir valores exactos")
            }
        }
    }



    return(
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="form col">
                <p>Ingresa los nuevos datos</p>
                {/*NOMBRE*/}
                <div className={'position-relative mt-2'}>
                    <input className={"input " + (registerFilled.user_name? 'is-filled':' ')}
                           type={'text'}
                           name={'user_name'}
                           onChange={handleInputName}
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
                           onChange={handleInputLastName}
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

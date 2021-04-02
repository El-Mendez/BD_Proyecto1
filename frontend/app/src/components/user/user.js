import React, {Fragment, useState, useEffect} from 'react';
import { useRouteMatch } from "react-router-dom";
import Axios from 'axios';
import Esqueleto from './userDescription';
import './user.scss';


export default function user (){
    const get_user = 'http://3.135.234.254:3000/getUserDescription'
    const [data, setData] = useState([])
    const userId = useRouteMatch ('/user/:id')
    useEffect(() => {
        const fetchData = async () => {
          try{
            const response = await Axios.post(get_user, {
                username: userId.params.id
                //username: 'Zara12'
            })
            setData(response.data[0]);
          }catch (e){
            setError(e);
            console.log(e)
          }
        };
        fetchData();
      },[setData])
        return(
            <Esqueleto
            username = {data.username}
            nombres = {data.nombres}
            apellidos = {data.apellidos}
            desc = {data.descripcion}
            correo = {data.correo}
            />
        );
}
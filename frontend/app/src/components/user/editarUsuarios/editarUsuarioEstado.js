import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
export default function editStateUser (props){
    const [filled, setFilled] = React.useState(false);
    const post_song = 'http://3.135.234.254:3000/songOf/';
    let estado = true;
    let nombre = "";

    const handleEstado = (e) =>{
        console.log(e.target.value);
        if (e.target.value == "Activar"){
          estado = true;
        }else{
          estado = false;
        }
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }
    const handleNombre = (e) =>{
        console.log(e.target.value);
        nombre = e.target.value
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }

      const onSubmit = () =>{
        changeUserState();
    }

    const changeUserState = () =>{
      const fetchData = async () =>{
          try{
              const { data } = await Axios.post(post_song,
                {
                  estado:  estado,
                  cancion: nombre,
                  artista: artista
                }
              );
              alert("Cambio del album realizado")
          } catch (error){
              console.log(error)
              alert("Datos incorrectos, recuerde introducir valores exactos")
          }
      }
      fetchData();
  };

    return(
        <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ingrese los datos del usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleNombre}
          />
          <label className={'label'}>Username</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2 box'} >
        <select name="Estados" id="Estados" onChange={handleEstado}>
          <option value="Activar">Activar</option>
          <option value="Desactivar">Desactivar</option>
        </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

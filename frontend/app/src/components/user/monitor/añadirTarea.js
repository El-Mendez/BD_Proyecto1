import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
import Axios from 'axios';
export default function añadirTarea (props){
    const [filled, setFilled] = React.useState(false);

    const post_album = 'http://3.135.234.254:3000/monitorTask/';
    let nombre = "";
    let tarea = "1";

    const handleName = (e) =>{
      console.log(e.target.value);
      nombre = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
  const handleNewTask = (e) =>{
      console.log(e.target.value);
      tarea = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
    const onSubmit = () =>{
      addTask();
  }
  
    const addTask = () =>{
      const fetchData = async () =>{
          try{
              const { data } = await Axios.post(post_album,
                {
                  monitor:  nombre,
                  tarea: tarea,
                }
              );
              alert("La tarea se ha realizado con exito")
          } catch (error){
              console.log(error)
              alert("Ha ocurrido")
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
          Ingrese los datos del monitor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleName}
          />
          <label className={'label'}>Nombre del monitor</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2 box'} >
        <select name="Estados" id="Estados" onChange={handleNewTask}>
          <option value="1">Modificar información de track y álbum</option>
          <option value="2">Desactivar tracks y álbumes</option>
          <option value="3">Desactivar usuarios sin suscrìpción</option>
          <option value="4">Eliminar suscripción de usuarios</option>
          <option value="5">Desactivar usuarios registrados como artistas</option>
          <option value="6">Asociar un usuario existente a un perfil de monitoreo</option>
          <option value="7">Generar los reportes ofrecidos por la plataforma</option>
          <option value="8">Consulta de bitácora de operaciones</option>
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

import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
export default function editAlbum (props){
    const post_artist = 'http://3.135.234.254:3000/updateArtistName/';
    const [filled, setFilled] = React.useState(false);
    let nuevoNombre = ''
    let viejoNombre = ''

    const handleOldName = (e) =>{
        console.log(e.target.value);
        viejoNombre = e.target.value
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }
    const handleNewName = (e) =>{
        console.log(e.target.value);
        nuevoNombre = e.target.value
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }
      const onSubmit = () =>{
        changeName(nuevoNombre, viejoNombre);
    }
    const changeName = (nuevoNombre, viejoNombre) =>{
      const fetchData = async () =>{
          try{
            console.log("Esto es una prueba " + nuevoNombre + " " + viejoNombre)
              const { data } = await Axios.post(post_artist,
                {
                    newName: nuevoNombre,
                    oldName: viejoNombre
                }
              );
              alert("Cambio del artista realizado")
          } catch (error){
              console.log(error)
              alert("Datos incorrectos, recuerde introducer valores exactos")
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
          Ingrese los datos del artista
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleOldName}
          />
          <label className={'label'}>Nombre del artista</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleNewName}
          />
          <label className={'label'}>Nuevo nombre del artista</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

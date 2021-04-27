import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
export default function editAlbum (props){
    const [filled, setFilled] = React.useState(false);
    const post_song = 'http://3.135.234.254:3000/changeSongName/';
    let newName = "";
    let oldName = "";
    let artista = "";

    const handleOldName = (e) =>{
      console.log(e.target.value);
      oldName = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
  const handleNewName = (e) =>{
      console.log(e.target.value);
      newName = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
  const handleArtista = (e) =>{
      console.log(e.target.value);
      artista = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
    const onSubmit = () =>{
      changeSongName();
  }

  const changeSongName = () =>{
    const fetchData = async () =>{
        try{
            const { data } = await Axios.post(post_song,
              {
                newName:  newName,
                oldName: oldName,
                artist: artista
              }
            );
            alert("Cambio de la cancion realizado")
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
          Ingrese los datos de la canción
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleOldName}
          />
          <label className={'label'}>Nombre de la canción</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleArtista}
          />
          <label className={'label'}>Artista</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleNewName}
          />
          <label className={'label'}>Nuevo nombre</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"}onClick={onSubmit} >Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
import Axios from 'axios';
export default function editAlbum (props){
    const [filled, setFilled] = React.useState(false);

    const post_album = 'http://3.135.234.254:3000/deleteAlbum/';
    let nombre = "";
    let artista = "";

    const handleName = (e) =>{
      console.log(e.target.value);
      nombre = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
  const handleArtist = (e) =>{
      console.log(e.target.value);
      artista = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
    const onSubmit = () =>{
      deleteSong();
  }
  const deleteSong = () =>{
    const fetchData = async () =>{
        try{
            const { data } = await Axios.post(post_album,
              {
                album:  nombre,
                artista: artista,
              }
            );
            alert("Se ha eliminado el album")
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
                Ingrese los datos del album que desea eliminar
              </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleName}
          />
          <label className={'label'}>Nombre del Album</label>
        </div>
      </Modal.Body>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleArtist}
          />
          <label className={'label'}>Nombre del Artista</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Eliminar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

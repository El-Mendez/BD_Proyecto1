import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
export default function editAlbum (props){
    const [filled, setFilled] = React.useState(false);
    const post_album = 'http://3.135.234.254:3000/changeAlbumDate/';
    let nombre = "";
    let artista = "";
    let date = "";

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
  const handleDate = (e) =>{
      console.log(e.target.value);
      date = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }

    const onSubmit = () =>{
      changeDate();
  }
  const changeDate = () =>{
    const fetchData = async () =>{
        try{
            const { data } = await Axios.post(post_album,
              {
                date:  date,
                album: nombre,
                artista: artista
              }
            );
            alert("Cambio del album hecho")
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
          Ingrese los datos del album
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleName}
          />
          <label className={'label'}>Nombre del album</label>
        </div>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleArtist}
          />
          <label className={'label'}>Artista</label>
        </div>
      <div className={'position-relative mt-2 fecha'}>
          <input type = "date" onChange={handleDate}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

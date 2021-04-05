import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default function addSong (props){

    const [filled, setFilled] = React.useState(false);
    const post_song = 'http://3.135.234.254:3000/addSong/';
    let nombre = "";
    let id_link = "";

    const handleName = (e) =>{
      console.log(e.target.value);
      nombre = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
  const handleLink = (e) =>{
      console.log(e.target.value);
      id_link = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }
    const onSubmit = () =>{
      addSong();
  }
  const addSong = () =>{
    const fetchData = async () =>{
        try{
            const { data } = await Axios.post(post_song,
              {
                cancion: nombre,
                link: id_link,
                artista: props.username,
              }
            );
            alert("Se ha eliminado la cancion")
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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Ingrese los datos de la cancion que desea eliminar
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input className={"input " + (filled? 'is-filled':' ')}
                           type={'text'}
                           name={'name'}
                           onChange={handleName}
                />
                <label className={'label'}>Nombre de la cancion</label>
            </Modal.Body>
            <Modal.Body>
                <input className={"input " + (filled? 'is-filled':' ')}
                           type={'text'}
                           name={'name'}
                           onChange={handleLink}
                />
                <label className={'label'}>Id de Youtube</label>
            </Modal.Body>
            <Modal.Footer>
              <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Enviar</Button>
              <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

    );
}

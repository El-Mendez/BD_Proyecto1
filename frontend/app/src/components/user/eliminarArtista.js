import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import Axios from 'axios';
import history from '../history';
export default function editAlbum (props){
    const [filled, setFilled] = React.useState(false);
    const post_artist = 'http://3.135.234.254:3000/deleteArtist/';
    let artistName = ''

    const handleInputChange = (e) =>{
        console.log(e.target.value);
        artistName = e.target.value
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }
      
      const onSubmit = () =>{
        deleteArtist();
    }

    const deleteArtist = () =>{
      const fetchData = async () =>{
          try{
              const { data } = await Axios.post(post_artist,
                {
                    nombre: artistName
                }
              );
              alert("Se ha eliminado al artista")
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
          Ingrese los datos del artista que desea eliminar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nombre del artista</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit} >Eliminar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
export default function editAlbum (props){
    const [filled, setFilled] = React.useState(false);

    const handleInputChange = (e) =>{
        console.log(e.target.value);
        //setPlaylistName(e.target.value);
        if(e.target.value !==''){
          setFilled(true);
        }else{
          setFilled(false);
        }
      }

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
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nombre del album</label>
        </div>
      </Modal.Body>
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
      <Modal.Body>
      <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nuevo nombre para el album</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} >Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function deleteSong (props){

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
                           onChange={handleInputChange}
                />
                <label className={'label'}>Nombre de la cancion</label>
                <input className={"input " + (filled? 'is-filled':' ')}
                       type={'text'}
                       name={'name'}
                       onChange={handleInputChange}
                />
                <label className={'label'}>Nombre del artista</label>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

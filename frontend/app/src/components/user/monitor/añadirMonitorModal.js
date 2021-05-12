import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
import Axios from 'axios';
export default function añadirMonitorModal (props){
    const [filled, setFilled] = React.useState(false);

    const post_album = 'http://3.135.234.254:3000/addMonitor/';
    let nombre = "";

    const handleName = (e) =>{
      console.log(e.target.value);
      nombre = e.target.value;
      if(e.target.value !==''){
        setFilled(true);
      }else{
        setFilled(false);
      }
    }

    const onSubmit = () =>{
        addMonitor();
  }
  
    const addMonitor = () =>{
      const fetchData = async () =>{
          try{
              const { data } = await Axios.post(post_album,
                {
                  monitor:  nombre
                }
              );
              alert("Se ha creado al monitor")
          } catch (error){
              console.log(error)
              alert("Ha ocurrido un error")
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
          Ingrese el nombre del nuevo monitor
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
      <Modal.Footer>
      <Button className={"btn-zoa border-btn mb-2"} onClick={onSubmit}>Enviar</Button>
      <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

    );
}

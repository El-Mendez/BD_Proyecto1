import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


export default function MonitorModal(props) {
  const info = props;
  const post = 'http://3.135.234.254:3000/monitorProfile'
  let { user } = useParams;
  let monitorUsuario = 'Mr';

  function addMonitor(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            identifier: info.identifier,
            monitor: monitorUsuario,
            modifier: user,
          }
        );
        alert('Se ha asociado el perfil correctamente');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleEstado = (e) =>{
    monitorUsuario = e.target.value;
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header className="bg-purple-dark">
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="modalHeader my-2">
            {info.header}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select onChange={handleEstado}>
          {
            info.monitors.map((monitor) => {
              return(
                <option value={monitor.nombre}>{monitor.nombre}</option>
              );
            })
          }
        </select>
      </Modal.Body>
      <Modal.Footer className="mt-2">
        <Button className={"border-btn mb-2"} onClick={info.onHide}>Cancelar</Button>
        <Button className={'purple-btn mb-2'} onClick={()=>{addMonitor()}}>{info.option}</Button>
      </Modal.Footer>
    </Modal>
  );
}

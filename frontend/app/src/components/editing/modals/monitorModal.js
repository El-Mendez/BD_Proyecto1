import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


export default function MonitorModal(props) {
  const info = props;
  const post = 'http://3.135.234.254:3000/monitorProfile'
  let { user } = useParams();
  const [monitor, setMonitor] = React.useState('');

  function addMonitor(){
    const fetchData = async () => {
      console.log(monitor)
      console.log(user)
      console.log(info.identifier)
      try {
        const { data } = await Axios.post(post,
          {
            identifier: info.identifier,
            monitor: monitor,
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
    let index = e.target.selectedIndex;
    setMonitor(e.target.options[index].text)
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
        <select onChange={handleEstado} defaultValue="choice">
          <option value="choice" disabled>Seleccione un monitor</option>
          {
            info.monitors.map((monitor) => {
              const index = info.monitors.indexOf(monitor)
              return(
                <option value={monitor.nombre} key={index}>{monitor.nombre}</option>
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

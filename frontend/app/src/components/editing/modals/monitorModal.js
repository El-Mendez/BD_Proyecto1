import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


export default function MonitorModal(props) {
  const data = props;
  const post = 'http://3.135.234.254:3000/createPlaylist' //Pasar por props
  const get_monitors = 'http://3.135.234.254:3000/createPlaylist';
  let { user } = useParams;
  let monitorUsuario = 'Mr';

  //State variables
  const [monitors, setMonitors] = React.useState([]);

  function addMonitor(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            identifier: data.identifier,
            modifier: user,
            monitor: monitorUsuario,
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
    console.log(e.target.value);
    monitorUsuario = e.target.value;
  }

  useEffect(()=>{
      const fetchData = async () => {
        try {
          const { data } = await Axios.post(get_monitors);
          setMonitors(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
  });


  const handleClick = ()=>{
    addMonitor();
    data.show = false;
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
            {data.header}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select onChange={handleEstado}>
          {
            monitors.map((monitor) => {
              return(
                <option value={monitor.nombre}>{monitor.nombre}</option>
              );
            })
          }
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
      </Modal.Body>
      <Modal.Footer className="mt-2">
        <Button className={"border-btn mb-2"} onClick={data.onHide}>Cancelar</Button>
        <Button className={'purple-btn mb-2'} onClick={handleClick}>{data.option}</Button>
      </Modal.Footer>
    </Modal>
  );
}

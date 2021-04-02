import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
import Axios from 'axios';

export default function Upgrade(props) {

  //const post = 'http://3.135.234.254:3000/createPlaylist' //missing

  //State variables
  const [data, setData] = React.useState({
    tarjeta: '',
    vencimiento: '',
    seguridad: ''
  });
  const [filled, setFilled] = React.useState(false);

  // function postPlaylist(){
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await Axios.post(post,
  //         {
  //           nombre: playlistName
  //         }
  //       );
  //       console.log("todo fine")
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // };


  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    if(e.target.value !==''){
      setFilled(true);
    }else{
      setFilled(false);
    }
  }

  const handleClick = ()=>{
    if(data.tarjeta !== '' && data.vencimiento !== '' && data.seguridad !== ''){
      console.log('vamo a crear la playlist')
    }else{
      alert('Llena todos los campos para completar tu solicitud')
    }
  }


  return (
    <Modal
      {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Zoa Premium
        </Modal.Title>
        5.99 USD al mes, después de la prueba
      </Modal.Header>
      <Modal.Body>
        Datos de pago
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'tarjeta'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Número de tarjeta</label>
        </div>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'month'}
                 name={'vencimiento'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Fecha de vencimiento</label>
        </div>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'seguridad'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Código de seguridad</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/*<Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>*/}
        <Button className={'purple-btn mb-2'} onClick={handleClick}>Iniciar suscripción</Button>
      </Modal.Footer>
    </Modal>
  );
}



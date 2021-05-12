import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
import Axios from 'axios';

export default function ModalSongsArtists(props) {

  const get = 'http://3.135.234.254:3000/reports/topArtistSongs'; //Cambiar por la generación del reporte
  let { url } = useRouteMatch();
  const [result, setResult] = useState([])

  //State variables
  const [data, setData] = React.useState({
    limit: 0,
    artist: '',
  });

  const [filled, setFilled] = React.useState({
    limit: false,
    artist: false,
  });

  function generateReport(){
    const fetchData = async () => {
      try{
        const response = await Axios.get(get, 
            {
                artistName:  data.artist,
                quantity: data.limit,
              }
        )
        setResult(response.data);
        console.log(data.username)
      }catch (e){
        console.log(e)
      }
    };
    fetchData();
  };

  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]:e.target.value,
    });
    if(e.target.value !== ''){
      setFilled({
        ...filled,
        [e.target.name]: true
      });
    }else{
      setFilled({
        ...filled,
        [e.target.name]: false
      });
    }
  }

  const handleClick = ()=>{
    if(playlistName !== ''){
      generateReport();
      setTimeout(()=>{
        console.log(history.location);
        history.push(`${url}/songStreams`);
        history.go();
      },300)
    }else{
      alert('Indica un nombre para tu playlist')
    }
  }


  return (
    <Modal
      {...props}
      //size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Datos para reporte
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled.artist? 'is-filled':' ')}
                 type="text"
                 name="artist"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Artista</label>
        </div>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled.limit? 'is-filled':' ')}
                 type="number"
                 name="limit"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Limite de canciones</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
        <Button className={'purple-btn mb-2'} >Generar reporte</Button>
      </Modal.Footer>
    </Modal>
  );
}

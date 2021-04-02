import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
import Axios from 'axios';

export default function CreatePlaylist(props) {

  const post = 'http://3.135.234.254:3000/createPlaylist'
  let { url } = useRouteMatch();

  //State variables
  const [playlistName, setPlaylistName] = React.useState('');
  const [filled, setFilled] = React.useState(false);

  function postPlaylist(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            nombre: playlistName
          }
        );
        console.log("todo fine")
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };




  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setPlaylistName(e.target.value);
    if(e.target.value !==''){
      setFilled(true);
    }else{
      setFilled(false);
    }
  }

  const handleClick = ()=>{
    if(playlistName !== ''){
      console.log('vamo a crear la playlist')
      postPlaylist();
      setTimeout(()=>{
        console.log('just testing')
        console.log(history.location);
        history.push(`${url}/editPlaylist`);
        history.go();
        console.log(history.location);
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
          Nueva playlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nombre de playlist</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
        <Button className={'purple-btn mb-2'} onClick={handleClick}>Crear playlist</Button>
      </Modal.Footer>
    </Modal>
  );
}

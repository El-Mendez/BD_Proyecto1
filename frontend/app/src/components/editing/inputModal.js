import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../history';
import Axios from 'axios';


export default function InputModal(props) {
  const data = props;
  const post = 'http://3.135.234.254:3000/createPlaylist' //Cambiar por la generación del reporte
  let { url } = useRouteMatch();

  //State variables
  const [reportDate, setReportDate] = React.useState(new Date());
  const [filled, setFilled] = React.useState(false);

  function generateReport(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            date: reportDate
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
    setReportDate(e.target.value);
    if(e.target.value !==''){
      setFilled(true);
    }else{
      setFilled(false);
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
        <div className={'position-relative mt-2 border-btn'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type={'text'}
                 name={'name'}
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nuevo nombre</label>
        </div>
      </Modal.Body>
      <Modal.Footer className="mt-2">
        <Button className={"border-btn mb-2"} onClick={data.onHide}>Cancelar</Button>
        <Button className={'purple-btn mb-2'} >{data.option}</Button>
      </Modal.Footer>
    </Modal>
  );
}

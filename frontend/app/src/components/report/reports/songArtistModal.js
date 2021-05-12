import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default function RangeDate(props) {

  const post = 'http://3.135.234.254:3000/reports/topArtistSongs' //Cambiar por la generación del reporte

  //State variables
  let result = 0;
  const [artistName, setArtistName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [filled, setFilled] = React.useState(false);


  function generateReport(){
    const fetchData = async () => {
        console.log(artistName)
        console.log(quantity)
      try {
        const response = await Axios.post(post,
          {
            artistName: artistName,
            quantity: quantity
          }
        );
        console.log(response.data);
        props.setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setArtistName(e.target.value);
    if(e.target.value !==''){
      setFilled(true);
    }else{
      setFilled(false);
    }
  }
  const handleInputChange2 = (e) =>{
    console.log(e.target.value);
    setQuantity(e.target.value);
    if(e.target.value !==''){
      setFilled(true);
    }else{
      setFilled(false);
    }
  }

  const handleClick = ()=>{
    if(reportDate !== ''){
      generateReport();
      setTimeout(()=>{
        var end = new Date();
        end.setDate(new Date(reportDate).getDate() + 7);
        props.updateData(reportDate.toString(), (end.getFullYear() + "-0" + (end.getMonth()+1 + "-0" + end.getDate())) ,result);
        props.onHide();
      },300)
    }else{
      alert('Indica la fecha de inicio para el reporte')
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
          <input className={"input " + (filled? 'is-filled':' ')}
                 type="text"
                 name="name"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Nombre del artista</label>
        </div>
      </Modal.Body>
      <Modal.Body>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type="number"
                 name="name"
                 onChange={handleInputChange2}
          />
          <label className={'label'}>Cantidad</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
        <Button className={'purple-btn mb-2'} onClick={generateReport}>Generar reporte</Button>
      </Modal.Footer>
    </Modal>
  );
}

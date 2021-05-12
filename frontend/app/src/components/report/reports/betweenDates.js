import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default function BetweenDates(props) {

  const post = 'http://3.135.234.254:3000/reports/genreStreams'

  //State variables
  const [reportDate, setReportDate] = React.useState({
    start: new Date(),
    end: new Date(),
  });
  const [filled, setFilled] = React.useState(false);
  const [result, setResult] = React.useState([]);


  function generateReport(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            from: reportDate.start,
            to: reportDate.end
          }
        );
        console.log(data);
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleInputChange = (e) =>{
    setReportDate({
      ...reportDate,
      [e.target.name]: e.target.value
    });
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
        props.updateData(reportDate.start.toString(), reportDate.end.toString() ,result);
        props.updateData(reportDate.start.toString(), reportDate.end.toString() ,result);
        props.onHide();
      },300)
    }else{
      alert('Indica el rango de fechas para el reporte')
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
                 type="date"
                 name="start"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Reporte desde</label>
        </div>
        <div className={'position-relative mt-2'}>
          <input className={"input " + (filled? 'is-filled':' ')}
                 type="date"
                 name="end"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Hasta</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
        <Button className={'purple-btn mb-2'} onClick={handleClick}>Generar reporte</Button>
      </Modal.Footer>
    </Modal>
  );
}

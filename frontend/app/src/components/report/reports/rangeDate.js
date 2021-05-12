import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
import Axios from 'axios';

export default function RangeDate(props) {

  const post = 'http://3.135.234.254:3000/reports/weeklyStreams' //Cambiar por la generación del reporte
  let { url } = useRouteMatch();

  //State variables
  let result = 0;
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
        console.log(data[0].weekly_streams);
        result = data[0].weekly_streams;
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
                 type="date"
                 name="name"
                 onChange={handleInputChange}
          />
          <label className={'label'}>Reporte desde</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={"border-btn mb-2"} onClick={props.onHide}>Cerrar</Button>
        <Button className={'purple-btn mb-2'} onClick={handleClick}>Generar reporte</Button>
      </Modal.Footer>
    </Modal>
  );
}

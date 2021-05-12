import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


export default function InputModal(props) {
  const data = props;
  const post = 'http://3.135.234.254:3000/createPlaylist' //Pasar por props
  let { user } = useParams;

  //State variables
  const [filled, setFilled] = React.useState(false);

  function updateName(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(post,
          {
            identifier: data.identifier,
            modifier: user,
          }
        );
        alert('Se ha actualizado el nombre correctamente');
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
      updateName();
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
        <Button className={'purple-btn mb-2'} onClick={handleClick}>{data.option}</Button>
      </Modal.Footer>
    </Modal>
  );
}

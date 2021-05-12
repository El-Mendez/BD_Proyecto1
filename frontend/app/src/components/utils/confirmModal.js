import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

export default function ConfirmModal(props) {
  const data = props;
  let { user } = useParams();

  function sendQuery(){
    console.log(data.identifier)
    console.log(user)
    const fetchData = async () => {
      try {
        const { } = await Axios.post(data.request,
          {
            identifier: data.identifier,
            modifier: user,
          }
        );
        data.onHide
        alert('Se ha efectuado la operación correctamente');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

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
        <div className="d-flex align-items-center">
          <span className=" text-primary f-24 text-purple-dark"> {data.icon} </span>
          <p className="ms-3 mb-0 modalBody">
            {data.details}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="mt-2">
        <Button className={"border-btn mb-2"} onClick={data.onHide}>Cancelar</Button>
        <Button className={'purple-btn mb-2'} onClick={()=>{sendQuery()}}>{data.option}</Button>
      </Modal.Footer>
    </Modal>
  );
}

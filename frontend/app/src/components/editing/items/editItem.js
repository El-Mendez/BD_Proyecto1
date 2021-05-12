import React from 'react';
import test from '../../../assets/badLiar.jpg'
import ConfirmModal from '../../utils/confirmModal';
import { BsFillTrashFill as ElIcon, BsXCircleFill as DesIcon} from 'react-icons/bs';
import InputModal from '../modals/inputModal';

export default function EditItem(props){
  const data = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);
  const [inputModal, setInputModal] = React.useState(false);

  return(
    <div className="row-title-grid pSong-grid text-secondary mt-2">
      {/* INDEX */}
      <div className={"pR_title justify-self-end"}>
        <small>{data.index}</small>
      </div>
      {/* SONG INFO */}
      <div className={"pR_title text-secondary"}>
        <img src={test} alt="Test" width={"45px"} className={"me-3"}/>
        <div>
          <p className="m-0 p-0">{data.title}</p>
          <p className={"p-0"} id="song-artist">{data.details}</p>
        </div>
      </div>
      {/* SONG ALBUM */}
      <div className={"pR_title justify-self-star"}>
        <small>{data.info}</small>
      </div>
      {/* DROPDOWN MENU */}
      <div className={"pR_title justify-self-end cursor"}>
        <div className=" dropstart ">
          <button className=" no-design" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
           <span className=" text-secondary ">
                   {data.icon}
           </span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {
              !data.artist? <li><button className="dropdown-item" onClick={() => setInputModal(true)}>Actualizar nombre</button></li> :''
            }
            <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li>
            <li><a className="dropdown-item" onClick={() => setModal1Show(true)}>Eliminar </a></li>
          </ul>
        </div>
      </div>
      {/*  Modals */}
      {/* Actualizar nombre */}
      <InputModal
        show={inputModal}
        onHide={() => setInputModal(false)}
        header = {"Actualización de nombre"}
        option = "Actualizar"
        identifier = {data.identifier}
      />
      {/* Desactivar álbum */}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header = {data.header_des}
        details = {data.details_des}
        option = "Desactivar"
        icon = {<DesIcon/>}
        identifier = {data.identifier}
      />
      {/* Eliminar álbum */}
      <ConfirmModal
        show={modal1Show}
        onHide={() => setModal1Show(false)}
        header = {data.header_el}
        details ={data.details_el}
        option = "Eliminar"
        icon = {<ElIcon/>}
        identifier = {data.identifier}
      />
    </div>
  );
}

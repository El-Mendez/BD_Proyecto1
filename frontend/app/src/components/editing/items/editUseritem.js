import React from 'react';
import ConfirmModal from '../../utils/confirmModal';
import { BsFillTrashFill as ElIcon, BsXCircleFill as DesIcon} from 'react-icons/bs';
import MonitorModal from '../modals/monitorModal';

export default function EditUserItem(props){
  const data = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);
  const [monitorShow, setMonitorShow] = React.useState(false);

  return(
    <div className="row-title-grid pSong-grid text-secondary mt-2">
      {/* INDEX */}
      <div className={"pR_title justify-self-end"}>
        <small>{data.index}</small>
      </div>
      {/* USER INFO */}
      <div className={"pR_title text-secondary"}>
        <div>
          <p className="m-0 p-0">{data.title}</p>
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
              data.usertype? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> :
                <li><button className="dropdown-item" onClick={() => setModal1Show(true)}>Eliminar suscripción </button></li>
            }
            <li><button className="dropdown-item" onClick={() => setMonitorShow(true)}>Asociar a un perfil de monitoreo </button></li>
          </ul>
        </div>
      </div>
      {/*  Modals */}
      {/* Desactivar  */}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header = {data.header_des}
        details = {data.details_des}
        identifier = {data.title}
        option = "Desactivar"
        icon = {<DesIcon/>}
        request = "http://3.135.234.254:3000/deactivateUser"
      />
      {/* Eliminar */}
      <ConfirmModal
        show={modal1Show}
        onHide={() => setModal1Show(false)}
        header = {data.header_el}
        details ={data.details_el}
        identifier = {data.title}
        option = "Eliminar"
        icon = {<ElIcon/>}
        request = "http://3.135.234.254:3000/deleteSubscription"
      />
    {/* Perfil de monitoreo */}
      <MonitorModal
        show={monitorShow}
        onHide={() => setMonitorShow(false)}
        header = {"Asociar perfil de monitoreo"}
        option = "Asociar perfil"
      />
    </div>
  );
}

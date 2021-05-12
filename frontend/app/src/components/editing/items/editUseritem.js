import React, { useEffect, useState } from 'react';
import ConfirmModal from '../../utils/confirmModal';
import { BsFillTrashFill as ElIcon, BsXCircleFill as DesIcon} from 'react-icons/bs';
import MonitorModal from '../modals/monitorModal';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditUserItem(props){
  const data = props;
  let { user } = useParams();

  const get_user = 'http://3.135.234.254:3000/getUserDescription';
  const get_tasks = 'http://3.135.234.254:3000/getSpecificTaskMonitor';
  const get_monitors = 'http://3.135.234.254:3000/getMonitors';
  let id_monitor = null;

  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);
  const [monitorShow, setMonitorShow] = React.useState(false);
  const [monitors, setMonitors] = React.useState([]);

  const [admin, setAdmin] = useState(false);
  const [tasks, setTasks] = useState({
    third: false,
    fourth: false,
    sixth: false
  });

  const [users, setUsers] = useState({
    third: false,
    fourth: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await Axios.post(get_user,
          {
            username: user
          })
        id_monitor = data[0].id_monitor;
        if (data[0].descripcion === 'Admin'){
          setAdmin(true);
        }
      }catch (e){
        console.log(e)
      }

      try{
        const { data } = await Axios.post(get_tasks,
          {
            id_monitor: id_monitor
          })
        if(data.some(item => item.id_tarea === 3)){
          setTasks({
            ...tasks,
            third: true,
          })
        }if(data.some(item => item.id_tarea === 4)){
          setTasks({
            ...tasks,
            fourth: true,
          })
        }if(data.some(item => item.id_tarea === 6)){
          setTasks({
            ...tasks,
            sixth: true,
          })
        }
      }catch (e){
        console.log(e)
      }

      if(data.usertype && tasks.third){
        setUsers({
          ...users,
          third: true
        })
      }

      if(!data.usertype && tasks.fourth){
        setUsers({
          ...users,
          fourth: true
        })
      }


    };

    fetchData();

    const fetchMonitors = async () => {
      try {
        const response = await Axios.get(get_monitors);
        setMonitors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonitors();

  });




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
              admin? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> :
                users.third? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> : ''
            }
            {
              admin? <li><button className="dropdown-item" onClick={() => setModal1Show(true)}>Eliminar suscripción </button></li> :
                users.fourth? <li><button className="dropdown-item" onClick={() => setModal1Show(true)}>Eliminar suscripción </button></li> : ''
            }
            {
              admin? <li><button className="dropdown-item" onClick={() => setMonitorShow(true)}>Asociar a un perfil de monitoreo </button></li> :
                tasks.sixth? <li><button className="dropdown-item" onClick={() => setMonitorShow(true)}>Asociar a un perfil de monitoreo </button></li> : ''
            }
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
        identifier = {data.info}
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
        identifier = {data.info}
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
        monitors = {monitors}
        identifier = {data.info}
      />
    </div>
  );
}

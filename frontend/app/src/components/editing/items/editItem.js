import React, { useEffect, useState } from 'react';
import test from '../../../assets/badLiar.jpg'
import ConfirmModal from '../../utils/confirmModal';
import { BsFillTrashFill as ElIcon, BsXCircleFill as DesIcon} from 'react-icons/bs';
import InputModal from '../modals/inputModal';
import { useParams, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';

export default function EditItem(props){
  const get_user = 'http://3.135.234.254:3000/getUserDescription';
  const get_tasks = 'http://3.135.234.254:3000/getSpecificTaskMonitor';

  const data = props;
  let { user } = useParams();
  let id_monitor = null;

  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);
  const [inputModal, setInputModal] = React.useState(false);

  const [admin, setAdmin] = useState(false);
  const [tasks, setTasks] = useState({
    first: false,
    second: false,
    fifth: false
  })

  const [artist, setArtist] = useState({
    second: false,
    fifth: false,
  })

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
        if(data.some(item => item.id_tarea === 1)){
          setTasks({
            ...tasks,
            first: true,
          })
        }if(data.some(item => item.id_tarea === 2)){
          setTasks({
            ...tasks,
            second: true,
          })
        }if(data.some(item => item.id_tarea === 5)){
          setTasks({
            ...tasks,
            fifth: true,
          })
        }
      }catch (e){
        console.log(e)
      }

      if(!data.artista && tasks.second){
        setArtist({
          ...artist,
          second: true
        })
      }

      if(data.artista && tasks.fifth){
        setArtist({
          ...artist,
          fifth: true
        })
      }

    };
    fetchData();
  })


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
              admin? <li><button className="dropdown-item" onClick={() => setInputModal(true)}>Actualizar nombre</button></li> :
                tasks.first? <li><button className="dropdown-item" onClick={() => setInputModal(true)}>Actualizar nombre</button></li> : ''
            }
            {
              admin? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> :
                artist.second? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> :
                artist.fifth? <li><button className="dropdown-item" onClick={() => setModalShow(true)}>Desactivar </button></li> : ''
            }

            {
              admin? <li><button className="dropdown-item" onClick={() => setModal1Show(true)}>Eliminar </button></li>: ''
            }

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
        identifier = {data.title}
        details = {data.details}
        request = {data.request}
      />
      {/* Desactivar álbum */}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header = {data.header_des}
        details = {data.details_des}
        option = "Desactivar"
        icon = {<DesIcon/>}
        identifier = {data.title}
        request = {data.des_request}

      />
      {/* Eliminar álbum */}
      <ConfirmModal
        show={modal1Show}
        onHide={() => setModal1Show(false)}
        header = {data.header_el}
        details ={data.details_el}
        option = "Eliminar"
        icon = {<ElIcon/>}
        identifier = {data.title}
        request = {data.del_request}
      />
    </div>
  );
}

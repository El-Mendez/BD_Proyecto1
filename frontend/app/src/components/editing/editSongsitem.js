import React from 'react';
import test from '../../assets/badLiar.jpg'
import ConfirmModal from '../utils/confirmModal';

export default function EditSongsItem(props){
  const songData = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);

  return(
    <div className="row-title-grid pSong-grid text-secondary mt-2">
      {/* INDEX */}
      <div className={"pR_title justify-self-end"}>
        <small>{songData.song_index}</small>
      </div>
      {/* SONG INFO */}
      <div className={"pR_title text-secondary"}>
        <img src={test} alt="Test" width={"45px"} className={"mr-3"}/>
        <div>
          <p className="m-0 p-0">{songData.song_t}</p>
          <p className={"p-0"} id="song-artist">{songData.song_a}</p>
        </div>
      </div>
      {/* SONG ALBUM */}
      <div className={"pR_title justify-self-star"}>
        <small>{songData.song_album}</small>
      </div>
      {/* DROPDOWN MENU */}
      <div className={"pR_title justify-self-end cursor"}>
        <div className=" dropstart ">
          <button className=" no-design" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
           <span className=" text-secondary ">
                   {songData.I_options}
           </span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item">Actualizar nombre</button></li>
            <li><button className="dropdown-item" onClick={() => setModal1Show(true)}>Desactivar</button></li>
            <li><a className="dropdown-item" onClick={() => setModalShow(true)}>Eliminar</a></li>
          </ul>
        </div>
      </div>
      {/*  Modals */}
      {/* Desactivar álbum */}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header = "Desactivación de álbum"
        details = "¿Estas seguro que deseas desactivar el álbum?"
        option = "Desactivar"
      />
      {/* Eliminar álbum */}
      <ConfirmModal
        show={modal1Show}
        onHide={() => setModal1Show(false)}
        header = "Eliminación de álbum"
        details = "¿Estas seguro que deseas eliminar el álbum?"
        option = "Eliminar"
      />
    </div>
  );
}

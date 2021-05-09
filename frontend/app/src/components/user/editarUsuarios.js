import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditSong from './editarCancionModal'
import StateSong from './editarCancionEstado'
import LinkSong from './editarCancionLink'
import StateUser from './editarUsuarios/editarUsuarioEstado'
import SuscriptionUser from './editarUsuarios/eliminarSuscripciónUsuario'
import AddMonitor from './editarUsuarios/añadirNuevoMonitor'

export default function editUser (){
    
    const [modalDeleteSong, setModalDeleteSuscriptiop] = React.useState(false);
    const [modalState, setModalState] = React.useState(false);
    const [modalMonitor, setModalMonito] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Activar o desactiva a un usuario sin suscripción</p>
                <Button variant="dark" onClick={() => setModalState(true)}>
                    Activar/Desactivar usuario sin suscripción
                </Button>
                <StateUser 
                        show={modalState}
                        onHide={() => setModalState(false)}
                        />
                </div>
                <div className="row editArtist">
                <p>Eliminar suscripción de un usuario de la base de datos</p>
                <Button variant="dark" onClick={() => setModalDeleteSuscriptiop(true)}>
                    Eliminar suscripción
                </Button>
                <SuscriptionUser 
                        show={modalDeleteSong}
                        onHide={() => setModalDeleteSuscriptiop(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Asociar un usuario existente a un perfil de monitoreo</p>
                <Button variant="dark" onClick={() => setModalMonito(true)}>
                    Añadir un nuevo monitor
                </Button>
                <AddMonitor 
                        show={modalMonitor}
                        onHide={() => setModalMonito(false)}
                    />
                </div>
            </div>
        </div>
        )

}
import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditSong from './editarCancionModal'
import DeleteSong from './eliminarCancion'
import StateSong from './editarCancionEstado'
import LinkSong from './editarCancionLink'

export default function editSong (){
    
    const [modalShowName, setModalShowNameSong] = React.useState(false);
    const [modalDelete, setModalDeleteSong] = React.useState(false);
    const [modalState, setModalState] = React.useState(false);
    const [modalLink, setModalLink] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Activa o desactiva una canción de la base de datos</p>
                <Button variant="dark" onClick={() => setModalState(true)}>
                    Activar/Desactivar canción
                </Button>
                <StateSong 
                        show={modalState}
                        onHide={() => setModalState(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Cambiar el link de una canción de la base de datos</p>
                <Button variant="dark" onClick={() => setModalLink(true)}>
                    Cambiar Link de una canción
                </Button>
                <LinkSong 
                        show={modalLink}
                        onHide={() => setModalLink(false)}
                    />
                </div>
            </div>
        </div>
        )

}
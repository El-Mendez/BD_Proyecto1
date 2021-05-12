import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditArtist from './editarArtistaModal'
import DeleteArtist from './eliminarArtista'
import StateArtist from './editarArtistaEstado'

export default function editAlbum (){

    const [modalShowName, setModalShowName] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const [modalState, setModalState] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Cambiale el nombre a un artista de la base de datos</p>
                <Button variant="dark"  onClick={() => setModalShowName(true)}>
                    Cambiar nombre de un artista
                    </Button>
                    <EditArtist 
                        show={modalShowName}
                        onHide={() => setModalShowName(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Desactivar Artista (sus canciones y albumes se desactivaran)</p>
                <Button variant="dark"  onClick={() => setModalState(true)}>Activar/Desactivar artista</Button>
                    <StateArtist 
                            show={modalState}
                            onHide={() => setModalState(false)}
                        />
                </div>
            </div>
        </div>
        )

}
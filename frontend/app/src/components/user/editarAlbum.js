import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditAlbum from './editarAlbumModal'
import DeleteAlbum from './eliminarAlbum'
import StateAlbum from './editarAlbumEstado'
import DateAlbum from './editarAlbumFecha'

export default function editAlbum (props){

    const [modalShowNameAlbum, setModalShowNameAlbum] = React.useState(false);
    const [modalDeleteAlbum, setModalDeleteAlbum] = React.useState(false);
    const [modalStateAlbum, setModalStateAlbum] = React.useState(false);
    const [modalDateAlbum, setModalDate] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Cambia el nombre de un album de la base de datos</p>
                <Button variant="dark" onClick={() => setModalShowNameAlbum(true)}>
                    Cambiar el nombre de un album  
                </Button>
                <EditAlbum 
                        show={modalShowNameAlbum}
                        onHide={() => setModalShowNameAlbum(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Cambia la fecha de publicación de un album de la base de datos</p>
                <Button variant="dark" onClick={() => setModalDate(true)}>
                    Cambiar la fecha de un album
                </Button>
                <DateAlbum 
                        show={modalDateAlbum}
                        onHide={() => setModalDate(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Activar/Desactivar un Album (sus canciones se desactivaran)</p>
                <Button variant="dark" onClick={() => setModalStateAlbum(true)}>
                    Activar/Desactivar un album
                </Button>
                <StateAlbum 
                        show={modalStateAlbum}
                        onHide={() => setModalStateAlbum(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Elimina un album de la base de datos (Precaución: esta acción no puede disolverse)</p>
                <Button variant="dark" onClick={() => setModalDeleteAlbum(true)}>
                    Eliminar un album
                </Button>
                <DeleteAlbum 
                        show={modalDeleteAlbum}
                        onHide={() => setModalDeleteAlbum(false)}
                    />
                </div>
            </div>
        </div>
        )

}
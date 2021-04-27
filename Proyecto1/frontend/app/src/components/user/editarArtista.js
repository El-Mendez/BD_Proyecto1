import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditArtist from './editarArtistaModal'
import DeleteArtist from './eliminarArtista'

export default function editAlbum (){

    const [modalShowName, setModalShowName] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);

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
                <p>Elimina un artista de la base de datos (Precaución: esta acción no puede disolverse)</p>
                <Button variant="dark"  onClick={() => setModalDelete(true)}>Eliminar a un artista</Button>
                    <DeleteArtist 
                            show={modalDelete}
                            onHide={() => setModalDelete(false)}
                        />
                </div>
            </div>
        </div>
        )

}
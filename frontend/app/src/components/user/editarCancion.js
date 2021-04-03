import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function editAlbum (props){
    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Activa o desactiva una canción de la base de datos</p>
                <Button variant="dark" >Activar/Desactivar canción</Button>
                </div>
                <div className="row editArtist">
                <p>Cambia el nombre de una canción de la base de datos</p>
                <Button variant="dark" >Cambiar nombre a una canción  </Button>
                </div>
                <div className="row editArtist">
                <p>Elimina una canción de la base de datos (Precaución: esta acción no puede disolverse)</p>
                <Button variant="dark" >Eliminar una canción</Button>
                </div>
            </div>
        </div>
        )

}
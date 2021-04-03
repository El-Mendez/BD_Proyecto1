import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function editAlbum (props){
    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Cambiale el nombre a un artista de la base de datos</p>
                <Button variant="dark" >Cambiar nombre de un artista</Button>
                </div>
                <div className="row editArtist">
                <p>Elimina un artista de la base de datos (Precaución: esta acción no puede disolverse)</p>
                <Button variant="dark" >Eliminar a un artista</Button>
                </div>
            </div>
        </div>
        )

}
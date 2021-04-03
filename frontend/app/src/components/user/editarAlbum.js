import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function editAlbum (props){
    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Cambia el nombre de un album de la base de datos</p>
                <Button variant="dark">Cambiar el nombre de un album  </Button>
                </div>
                <div className="row editArtist">
                <p>Cambia la fecha de publicación de un album de la base de datos</p>
                <Button variant="dark" >Cambiar la fecha de un album</Button>
                </div>
                <div className="row editArtist">
                <p>Elimina un album de la base de datos (Precaución: esta acción no puede disolverse)</p>
                <Button variant="dark" >Eliminar un album</Button>
                </div>
            </div>
        </div>
        )

}
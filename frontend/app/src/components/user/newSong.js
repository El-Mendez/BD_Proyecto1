import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NewSong from './newSongModal'
import NewAlbum from './newAlbumModal'
import AddSongAlbum from './addSongAlbum'

export default function editSong (props){
    
    const [modalSong, setModalSong] = React.useState(false);
    const [modalAlbum, setModalAlbum] = React.useState(false);
    const [modalAlbumSong, setModalAlbumSong] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Sube una nueva cancion que hayas subido a Youtube con anterioridad
                </p>
                <Button variant="dark" onClick={() => setModalSong(true)}>
                    Añadir nueva cancion 
                </Button>
                <NewSong 
                        username ={props.username}
                        show={modalSong}
                        onHide={() => setModalSong(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Sube un nuevo album a la aplicacion (Recuerda que debes añadirle por lo menos una cancion)   
                </p>
                <Button variant="dark" onClick={() => setModalAlbum(true)}>
                    Añadir nuevo album
                </Button>
                <NewAlbum 
                        show={modalAlbum}
                        onHide={() => setModalAlbum(false)}
                    />
                </div>
                <div className="row editArtist">
                <p>Añadele tus canciones a los albums que ya has creado
                </p>
                <Button variant="dark" onClick={() => setModalAlbumSong(true)}>
                    Añadir cancion a un album
                </Button>
                <AddSongAlbum 
                        username ={props.username}
                        show={modalAlbumSong}
                        onHide={() => setModalAlbumSong(false)}
                    />
                </div>
            </div>
        </div>
        )

}
import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NewSong from './newSongModal'

export default function editSong (props){
    
    const [modalSong, setModalSong] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Sube una nueva cancion que hayas subido a Youtube con anteoridad
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
            </div>
        </div>
        )

}
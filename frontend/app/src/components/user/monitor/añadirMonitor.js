import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditSong from '../editarCancionModal'
import StateSong from '../editarCancionEstado'
import LinkSong from '../editarCancionLink'
import StateUser from '../editarUsuarios/editarUsuarioEstado'
import SuscriptionUser from '../editarUsuarios/eliminarSuscripciónUsuario'
import AddMonitor from './añadirMonitorModal'
import AddTask from './añadirTarea'

export default function añadirMonitor (){
    
    const [modalAddMonitor, setModalAddMonitor] = React.useState(false);
    const [modalAddTask, setModalAddTask] = React.useState(false);

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row editArtist">
                <p>Añadir un nuevo monitor en la base de datos</p>
                <Button variant="dark" onClick={() => setModalAddMonitor(true)}>
                    Añadir nuevo monitor
                </Button>
                <AddMonitor 
                        show={modalAddMonitor}
                        onHide={() => setModalAddMonitor(false)}
                        />
                </div>
                <div className="row editArtist">
                <p>Asignarle tareas a un monitor</p>
                <Button variant="dark" onClick={() => setModalAddTask(true)}>
                    Asignar una tarea a un monitor
                </Button>
                <AddTask 
                        show={modalAddTask}
                        onHide={() => setModalAddTask(false)}
                    />
                </div>
            </div>
        </div>
        )

}
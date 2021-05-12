import React from 'react';
import test from "../../../assets/badLiar.jpg";

export default class userItemreport extends React.Component{
    render() {
        return(
            <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
                <div className={'ml-3'}>
                    <p className={'text-secondary mb-auto'}>Usuario: {this.props.username}</p>
                    <p className={'text-secondary mb-auto'}>Operación: {this.props.operacion}</p>
                    <p className={'text-secondary mb-auto'}>Fecha: {this.props.fecha}</p>
                    <p className={'text-secondary mb-auto'}>Elemento: {this.props.elemento}</p>
                </div>
                {/*<p className={'text-secondary-light'}>04/03/2021</p>*/}
            </div>
        );
    }
}

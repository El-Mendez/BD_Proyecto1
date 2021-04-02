import React from 'react';
import test from "../../../assets/badLiar.jpg";

export default class userItemreport extends React.Component{
    render() {
        return(
            <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
                <img src={test} className={'thumbnail-user'}/>
                <div className={'ml-3'}>
                    <h5 className={'text-secondary mb-auto'}>{this.props.username}</h5>
                    <p className={'text-secondary-light m-0'}>{this.props.type}</p>
                </div>
                {/*<p className={'text-secondary-light'}>04/03/2021</p>*/}
            </div>
        );
    }
}

import React from 'react';
import RegisterformContainer from './registerFormcontainer';
import test from '../../assets/badLiar.jpg'

export default class logIn extends React.Component {
    render() {
        return (
            <div className={'d-flex justify-content-around bg-secondary vw-100 h-100'}>
                <RegisterformContainer/>
                <img src={test} className={'ml-5 d-none d-lg-block'}/>
            </div>
        );
    }
}

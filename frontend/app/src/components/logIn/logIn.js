import React from 'react';
import LogInformContainer from "./logInformContainer";
import test from '../utils/badLiar.jpg'

export default class logIn extends React.Component{
    render(){
        return(
            <div className={'d-flex justify-content-around bg-secondary vw-100 vh-100'}>
                <LogInformContainer/>
                <img src={test} className={'mr-5  d-none d-lg-block'}/>
            </div>
        );
    }
}
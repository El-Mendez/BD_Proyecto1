import React from 'react';
import LogInformContainer from "./logInformContainer";
import test from '../utils/badLiar.jpg'

export default class logIn extends React.Component{
    render(){
        return(
            <div className={'container d-flex justify-content-around'}>
                <div >
                <LogInformContainer/>
                </div>
                <img src={test} className={'mr-5'}/>
            </div>
        );
    }
}
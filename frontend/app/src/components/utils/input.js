import React from 'react';

export default class input extends React.Component{
    render(){
        return(
            <div className={'position-relative mt-2'}>
                <input className={'input'} type={'email'}></input>
                <label className={'label'}>{this.props.name}</label>
            </div>
        );
    }
}
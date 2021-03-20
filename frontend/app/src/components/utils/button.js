import React from 'react';

export default class button extends React.Component{
    render(){
        return(
            <button className={`btn ${this.props.btnClass}`}>
                {this.props.btnName}
            </button>
        )
    }
}
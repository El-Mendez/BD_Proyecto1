import React from 'react';

export default class button extends React.Component{
    render(){
        return(
            <button
                onClick={this.props.handleClick}
                className={`btn ${this.props.btnClass} my-3`}>
                {this.props.btnName}
            </button>
        )
    }
}
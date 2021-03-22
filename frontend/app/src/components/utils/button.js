import React from 'react';

export default class button extends React.Component{
    render(){
        return(
            <button className={`btn ${this.props.btnClass} my-4` }>
                {this.props.btnName}
            </button>
        )
    }
}
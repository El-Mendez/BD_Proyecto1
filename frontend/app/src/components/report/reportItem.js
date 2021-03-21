import React from 'react';

import image from '../utils/badLiar.jpg';

export default class reportItem extends React.Component{
    render(){
        return(
            <div className="card m-2">
                <img src={image} className="card-img-top mt-2" alt="TEST"/>
                    <div className="card-body p-1 mt-2 text-secondary w-100">
                        <h5 className="card-title mb-1">{this.props.title}</h5>
                        <p className="card-text">{this.props.description}</p>
                    </div>
            </div>
        );
    }
}
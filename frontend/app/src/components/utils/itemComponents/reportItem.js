import React from 'react';

import image from '../../../assets/badLiar.jpg';

export default class reportItem extends React.Component{
    render(){
        return(
            <div className="report-card card m-2">
                <div className="image-container">
                    <div className="image-shadow">
                        <img src={image} className="image-top" alt="TEST"/>
                    </div>
                </div>
                {/*<img src={image} className="card-img-top mt-2" alt="TEST"/>*/}
                    <div className="card-body p-1 text-secondary w-100">
                        <h6 className="mb-1">{this.props.title}</h6>
                        <p className="card-text">{this.props.description}</p>
                    </div>
            </div>
        );
    }
}

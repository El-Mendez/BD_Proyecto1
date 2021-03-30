import React from 'react';
import image from "../utils/badLiar.jpg";

export default class songItem extends React.Component{
    render(){

        return(
            <div className="report-song-card card m-2" onClick={this.props.songPlaying}>
                <img src={image} className="card-img-top mt-2" alt="TEST"/>
                <div className="card-body p-1 mt-1 text-secondary w-100">
                    <p className="card-song-title">{this.props.s_name}</p>
                    <p className="card-text mt-1">{this.props.a_name}</p>
                </div>
            </div>
        );
    }
}

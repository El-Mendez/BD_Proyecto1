import React from 'react';
import image from "../utils/badLiar.jpg";

export default class songItem extends React.Component{
    render(){
        return(
            <div className="item-card card" onClick={this.props.songPlaying}>
              <div className="image-container">
                <div className="image-shadow">
                  <img src={image} className="image-top" alt="TEST"/>
                </div>
              </div>
              <div className="card-body p-1 mt-1 text-secondary w-100">
                  <p className="card-song-title">{this.props.s_name}</p>
                  <p className="card-text mt-1">{this.props.a_name}</p>
              </div>
            </div>
        );
    }
}

import React from 'react';
import test from "../../../assets/badLiar.jpg";

export default class userItemreport extends React.Component{
    render() {
        return(
          <div className={"row-title-record mt-4 mb-4 pSong-grid"}>
              <div className={"pR_title justify-self-star"}>
                  <small>{this.props.username}</small>
              </div>
              <div className={"pR_title justify-self-star"}>
                  <small>{this.props.operacion}</small>
              </div>
              <div className={"pR_title justify-self-star"}>
                  <small>{this.props.elemento}</small>
              </div>
              <div className={"pR_title justify-self-start"}>
                  <small>{this.props.fecha}</small>
              </div>
          </div>
        );
    }
}

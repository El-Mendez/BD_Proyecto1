import React from 'react';
import {BsPlayFill as I_play} from'react-icons/bs'
import test from '../utils/badLiar.jpg'
export default function SongItem(){
  return(
    <div>
      <div className="song-container text-secondary">
        <div className="play">
          <span className={"font-size m-0 p-0"}>
            <I_play/>
          </span>
        </div>
        <div className={"songs-details text-secondary"}>
          <img src={test} alt="Test" width={"40px"} className={"mr-3"}/>
          <p className="m-0 p-0">Song Title</p>
        </div>
      </div>
    </div>
  );
}

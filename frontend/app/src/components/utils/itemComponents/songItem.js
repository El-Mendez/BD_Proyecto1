//SONGS ON THE ARTIST PROFILE, ONLY RETURNS THE SONG NAME

import React from 'react';
import test from '../../../assets/badLiar.jpg'

export default function SongItem(props){
  const songData = props;

  return(
    <div>
      <div className="song-container text-secondary">
        <div className="pR_title justify-self-end">
          <span className={"font-size m-0 p-0"}>
            {songData.song_index}
          </span>
        </div>
        <div className={"songs-details text-secondary"}>
          <img src={`https://img.youtube.com/vi/${props.song_link}/maxresdefault.jpg`} alt="Test" width={"70px"} className={"mr-3"}/>
          <p className=" ms-3 m-0 p-0">{songData.song_title}</p>
        </div>
        <div className={"pR_title"}>
          <small>•••</small>
        </div>
      </div>
    </div>
  );
}

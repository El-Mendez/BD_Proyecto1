// SONGS ON A SEARCH, RETURNS THE SONG NAME AND THE ARTIST

import React from 'react';
import test from '../../../assets/badLiar.jpg'

export default function SongItem_artist(props){
  const songData = props;
  return(
    <div>
      <div className="song-container text-secondary">
        <div className="index">
          <span className={"font-size m-0 p-0"}>
            {songData.song_index}
          </span>
        </div>
        <div className={"songs-details text-secondary"}>
          <img src={test} alt="Test" width={"45px"} className={"mr-3"}/>
          <div>
            <p className="m-0 p-0">{songData.song_t}</p>
            <p className={"p-0"} id="song-artist">{songData.song_a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

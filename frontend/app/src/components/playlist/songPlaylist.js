import React from 'react';
import test from '../../assets/badLiar.jpg'

export default function SongItem_artist(props){
  const songData = props;
  return(
      <div className="row-title-grid pSong-grid text-secondary">
        {/* INDEX */}
        <div className={"pR_title justify-self-end"}>
          <small>{songData.song_index}</small>
        </div>
        {/* SONG INFO */}
        <div className={"pR_title text-secondary"}>
          <img src={test} alt="Test" width={"45px"} className={"mr-3"}/>
          <div>
            <p className="m-0 p-0">{songData.song_t}</p>
            <p className={"p-0"} id="song-artist">{songData.song_a}</p>
          </div>
        </div>
        {/* SONG ALBUM */}
        <div className={"pR_title justify-self-star"}>
          <small>{songData.song_album}</small>
        </div>
        {/* ADD O DELETE */}
        <div className={"pR_title justify-self-end"}>
          <span>
            {songData.I_options}
          </span>
        </div>
      </div>
  );
}

import React from 'react';
import test from '../../assets/badLiar.jpg'
import Axios from 'axios';

//ADD SONG TO A PLAYLIST
//DELETE SONG OF A PLAYLIST

//MISSING: CONFIGURE THE API AND THE PARAMETERS IN THE REQUEST

export default function SongItem_artist(props){
  const songData = props;

  const add_song = 'http://3.135.234.254:3000/addPlaylistSong';
  const delete_song = 'http://3.135.234.254:3000/deletePlaylistSong';

  //ADD SONGS
  function addSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(add_song,
          {
            playlist_id: songData.playlist_id,
            cancion: songData.song_t
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  function deleteSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(delete_song,
          {
            playlist_id: songData.playlist_id,
            cancion: songData.song_t
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleClick = () =>{
    if(songData.option === 1){
      addSong();
      setTimeout(() => {
        songData.actualizacion();
      },200)
    }else{
      deleteSong();
      setTimeout(()=>{
        songData.actualizacion();
      },200)

    }
  }


  return(
      <div className="row-title-grid pSong-grid text-secondary mt-2">
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
        {/* ADD OR DELETE */}
        <div className={"pR_title justify-self-end cursor"} onClick={handleClick}>
          <span>
            {songData.I_options}
          </span>
        </div>
      </div>
  );
}

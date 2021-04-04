import React, {useEffect} from 'react';
import image from '../../assets/badLiar.jpg';
import Axios from 'axios';
import SongItem from '../utils/itemComponents/songItem_artist';
import {BsTrash as I_delete,
  BsPlus as I_add,
  BsSearch as I_search} from 'react-icons/bs';
import { useParams } from 'react-router-dom';

// MISSING:
// -QUERY TO RETURN THE ACTUAL SONGS ON THE PLAYLIST
// -QUERY TO COUNT THE SONGS ON THE PLAYLIST

export default function EditPlaylist(){

  let { album } = useParams();
  const get_song = 'http://3.135.234.254:3000/getSpecificSong';
  const get_playlistSongs = 'http://3.135.234.254:3000/getSpecificSong';

  const [songs, setSongs] = React.useState([]);
  const [playlistSongs, setPlaylistSongs] = React.useState([]);

  //SONGS ON THE PLAYLIST
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_playlistSongs,
          {
            playlist: playlist
          }
        );
        setPlaylistSongs(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  })


  return(
    <section className={'overflow-auto'}>
      <div className={'playlist-container'}>
        <div className={"playlist-block"} style={{backgroundColor: '#d8d0c0'}}>
          <div className={"playlist-block playlist-bg"}/>
        </div>
        {/* IMAGE */}
        <div className="_pI1">
          <div className="_pI2">
            <div className="w-100 h-100">
              <img src={image} alt="Playlist Image" className={"playlist-image"} width={"100%"} height={"100%"}/>
            </div>
          </div>

        </div>
        <div className="_pD1">
          <h6>ALBUM</h6>
          <h2>{album}</h2>
          <p>Username • 10 canciones</p>
        </div>
      </div>
      {/* ACTUAL SONGS */}
      <div className={'container-fluid'}>
        <div className="contentSpacing">
          <div id={"actualSongs"} >
            <div className={"row-title"}>
              <div className={"row-title-grid mt-2 pSong-grid"}>
                <div className={"pR_title justify-self-end"}>
                  <small>#</small>
                </div>
                <div className={"pR_title justify-self-star"}>
                  <small>TITLE</small>
                </div>
                <div className={"pR_title justify-self-end"}>
                  <small>▴▵▴</small>
                </div>

              </div>
            </div>
            <section className={'mb-4'}>
              <div id="songs">
                <SongItem
                song_index={1}
                song_t={"Something"}
                song_a={"Io"}
                />
                {/*{*/}
                {/*  playlistSongs.map((song) => {*/}
                {/*    const index = playlistSongs.indexOf(song);*/}
                {/*    return(*/}
                {/*      <SongItem*/}
                {/*        key={index}*/}
                {/*        song_index={index + 1}*/}
                {/*        song_t={song.nombre}*/}
                {/*        song_a={song.artista}*/}
                {/*        song_album={song.album}*/}
                {/*        I_options={<I_delete/>}*/}
                {/*        option={0}*/}
                {/*        playlist_name={playlist}*/}
                {/*      />*/}
                {/*    );*/}
                {/*  })*/}
                {/*}*/}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, {useEffect} from 'react';
import image from '../../assets/badLiar.jpg';
import Axios from 'axios';
import SongItem from '../utils/itemComponents/songItem_nI';
import { useParams } from 'react-router-dom';

export default function AlbumSongs(){

  let { genre } = useParams();
  const get_songs = 'http://3.135.234.254:3000/getSongByGenre';

  const [songs, setSongs] = React.useState([]);

  //SONGS ON THE ALBUM
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_songs,
          {
            genero: genre
          }
        );
        setSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[setSongs])


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
          <h6>GÉNERO</h6>
          <h2>{genre}</h2>
          <p>• {songs.length} canciones •</p>
        </div>
      </div>
      {/* GENRE SONGS */}
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
              </div>
            </div>
            <section className={'mb-4'}>
              <div id="songs">
                {
                  songs.map((song) => {
                    const index = songs.indexOf(song);
                    return(
                      <SongItem
                        key={index}
                        song_index={index + 1}
                        song_t={song.cancion}
                        song_a={song.artista}
                      />
                    );
                  })
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

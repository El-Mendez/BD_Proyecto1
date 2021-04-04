import React, {useEffect} from 'react';
import image from '../../assets/badLiar.jpg';
import Axios from 'axios';
import SongItem from './songPlaylist';
import {BsTrash as I_delete,
  BsPlus as I_add,
  BsSearch as I_search} from 'react-icons/bs';
import { useParams } from 'react-router-dom';

// MISSING:
// -QUERY TO RETURN THE ACTUAL SONGS ON THE PLAYLIST
// -QUERY TO COUNT THE SONGS ON THE PLAYLIST

export default function EditPlaylist(){
  let { playlist } = useParams();
  const get_song = 'http://3.135.234.254:3000/getSpecificSong';
  const get_playlistSongs = 'http://3.135.234.254:3000/playlistSongs';
  const get_playlist = 'http://3.135.234.254:3000/getSpecificPlaylist';


  const [search, setSearch] = React.useState('');
  const [lsongs, setLsongs] = React.useState([]);
  const [playlistSongs, setPlaylistSongs] = React.useState([]);
  const [details, setDetails] = React.useState({
    id:0,
    user: '',
    canciones:0
  });

  //SONGS ON THE PLAYLIST
  useEffect(() =>{
    console.log('Loading...')
    const fetchPlaylist = async () => {
      try {
        console.log('testing')
        const { data } = await Axios.post(get_playlist,
          {
            nombre: playlist
          }
        );
        console.log('que pex')
        console.log(data)
        setDetails({
          id: data[0].id_playlist,
          user: data[0].username,
          canciones: data[0].canciones
        })
      } catch (error) {
        console.log(error);
        console.log('st happen')
      }
    };

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
    fetchPlaylist();
    fetchData();
  })

  //Search songs
  function getSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setLsongs(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleInputChange = (e) =>{
    setSearch(e.target.value);
  }

  const onClick = () =>{
    if(search !== ''){
      getSong();
    }else{
      alert('Ingrese el nombre de la canción para buscar')
    }
  }

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
          <h6>PLAYLIST</h6>
          <h2>{playlist}</h2>
          <p>{details.user} • {details.canciones} canciones</p>
        </div>
      </div>
      {/* ACTUAL SONGS */}
      <div className={"degraded-container"}>
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
                        <div className={"pR_title justify-self-star"}>
                          <small>ALBUM</small>
                        </div>
                        <div className={"pR_title justify-self-end"}>
                          <small>•••</small>
                        </div>

                    </div>
                </div>
                <section className={'mb-4'}>
                  <div id="songs">
                    {
                      playlistSongs.map((song) => {
                        const index = playlistSongs.indexOf(song);
                        return(
                          <SongItem
                            key={index}
                            song_index={index + 1}
                            song_t={song.cancion}
                            song_a={song.artista}
                            song_album={'Love Goes'}
                            I_options={<I_delete/>}
                            option={0}
                            playlist_name={playlist}
                          />
                        );
                      })
                    }
                  </div>
                </section>
              </div>
          </div>
      </div>
      {/* SEARCH SONG FOR THE PLAYLIST */}
      <section className={"search-songs"}>
        <div className={"d-inline-block"}>
          <h5 className={'text-secondary mb-3'}>Encontremos algo para tu playlist</h5>
          <div className={"d-flex search-container"}>
            <div className={"d-flex"} style={{background: '#ffffff1a'}}>
              <span className={"mx-2 text-secondary"}><I_search/></span>
              <input className={"sP-search"}
                     type={"text"}
                     maxLength={"80"}
                     name={'search'}
                     placeholder={"Nombre de la cancion"}
                     onChange={handleInputChange}/>
            </div>
            <button className={'btn upgrade-btn ml-4'} onClick={onClick}>
              BUSCAR
            </button>
          </div>
        </div>
        {/* CANCIONES ENCONTRADAS */}
        <section className={'my-4'}>
          <div id="songs">
            {
              lsongs.map((song) => {
                const index = lsongs.indexOf(song)
                return(
                  <SongItem
                    key={index}
                    song_index={index + 1}
                    song_t={song.cancion}
                    song_a={song.artista}
                    song_album={"Love Goes"}
                    I_options={<I_add/>}
                    option={1}
                    playlist_name={playlist}
                  />
                );
              })
            }
          </div>
        </section>
      </section>
    </section>
  );
}

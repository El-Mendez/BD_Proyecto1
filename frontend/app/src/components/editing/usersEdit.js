import React from 'react';
import Axios from 'axios';
import SongItem from '../playlist/songPlaylist';
import { BsPlus as I_add,
  BsSearch as I_search} from 'react-icons/bs';


export default function UsersEdit(){
  const get_song = 'http://3.135.234.254:3000/getSpecificSong';

  const [search, setSearch] = React.useState('');
  const [lsongs, setLsongs] = React.useState([]);


  //Search songs
  function getSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: search + '%'
          }
        );
        console.log('just Testing')
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
      {/* SEARCH SONG FOR THE PLAYLIST */}
      <section className={"search-songs"}>
        <div className={"d-inline-block"}>
          <h5 className={'text-secondary mb-3'}>Busca el usuario a editar</h5>
          <div className={"d-flex search-container"}>
            <div className={"d-flex"} style={{background: '#ffffff1a'}}>
              <span className={"mx-2 text-secondary"}><I_search/></span>
              <input className={"sP-search"}
                     type={"text"}
                     maxLength={"80"}
                     name={'search'}
                     placeholder={"Nombre de la canción"}
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
                    song.estado?
                      <SongItem
                        key={index}
                        song_index={index + 1}
                        song_t={song.cancion}
                        song_a={song.artista}
                        song_album={song.album}
                        I_options={<I_add/>}
                        option={1}
                        playlist_id={details.id}
                        actualizacion={() => actualizarPlaylist()}
                      /> : ''
                  );
                }
              )
            }
          </div>
        </section>
      </section>
    </section>
  );
}

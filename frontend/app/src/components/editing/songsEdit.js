import React from 'react';
import Axios from 'axios';
import { BsSearch as I_search, BsThreeDotsVertical as I_menu
} from 'react-icons/bs';
import EditingItem from './items/editItem';


export default function SongsEdit(){
  const get = 'http://3.135.234.254:3000/getSpecificSong';


  const [search, setSearch] = React.useState('');
  const [songs, setSongs] = React.useState([]);


  //Search songs
  function getSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setSongs(data)
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
          <h5 className={'text-secondary mb-3'}>Busca la canción a editar</h5>
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
            <button className={'btn upgrade-btn ms-4'} onClick={onClick}>
              BUSCAR
            </button>
          </div>
        </div>
        {/* FOUND SONGS */}
        <section className={'my-4'}>
          <div id="songs">
            {
              songs.map((song) => {
                  const index = songs.indexOf(song)
                  return (
                    song.estado ?
                      <EditingItem
                        key={index}
                        index={index + 1}
                        title={song.cancion}
                        details={song.artista}
                        info={song.album}
                        icon={<I_menu/>}
                        header_el={"Eliminación de canción"}
                        details_el={"¿Estas seguro que deseas eliminar la canción?"}
                        header_des={"Desactivación de canción"}
                        details_des={"¿Estas seguro que deseas desactivar la canción?"}
                        del_request="http://3.135.234.254:3000/deleteSong"
                        des_request="http://3.135.234.254:3000/deactivateSong"
                        request="http://3.135.234.254:3000/changeSongName"
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

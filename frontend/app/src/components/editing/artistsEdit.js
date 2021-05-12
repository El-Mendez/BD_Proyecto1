import React from 'react';
import Axios from 'axios';
import { BsSearch as I_search,
  BsThreeDotsVertical as I_menu
} from 'react-icons/bs';
import EditingItem from './items/editItem';


export default function ArtistsEdit(){
  const get = 'http://3.135.234.254:3000/SpecificArtist';

  const [search, setSearch] = React.useState('');
  const [artists, setArtists] = React.useState([]);


  //Search Artists
  function getArtists(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setArtists(data)
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
      getArtists();
    }else{
      alert('Ingrese el nombre del artista a buscar');
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
        {/* CANCIONES ENCONTRADAS */}
        <section className={'my-4'}>
          <div id="songs">
            {
              artists.map((artist) => {
                  const index = artists.indexOf(artist)
                  return (
                    artist.estado ?
                      <EditingItem
                        key={index}
                        index={index + 1}
                        title={artist.nombre}
                        details={" "}
                        info={'artista'}
                        icon={<I_menu/>}
                        header_el={"Eliminación de artista"}
                        details_el={"¿Estas seguro que deseas eliminar al artista?"}
                        header_des={"Desactivación de canción"}
                        details_des={"¿Estas seguro que deseas desactivar al artista?"}
                        artista={true}
                        des_request="http://3.135.234.254:3000/deactivateArtist"
                        del_request="http://3.135.234.254:3000/deleteArtist"
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

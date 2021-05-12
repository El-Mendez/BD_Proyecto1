import React from 'react';
import Axios from 'axios';
import { BsSearch as I_search,
  BsThreeDotsVertical as I_menu} from 'react-icons/bs';
import EditingItem from './items/editItem';

export default function AlbumsEdit(){
  const get = 'http://3.135.234.254:3000/getSpecificSong';

  const [search, setSearch] = React.useState('');
  const [albums, setAlbums] = React.useState([]);

  //Search albums
  function getAlbums(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setAlbums(data)
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
      getAlbums();
    }else{
      alert('Ingrese el nombre del álbum a buscar');
    }
  }

  return(
    <section className={'overflow-auto'}>
      {/* SEARCH ALBUM TO EDIT */}
      <section className={"search-songs"}>
        <div className={"d-inline-block"}>
          <h5 className={'text-secondary mb-3'}>Busca el álbum a editar</h5>
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
        {/*  FOUND ALBUMS */}
        <section className={'my-4'}>
          <div id="songs">
            {
              albums.map((album) => {
                  const index = albums.indexOf(album)
                  return(
                    album.estado?
                      <EditingItem
                        key={index}
                        index={index + 1}
                        title={album.albumes}
                        details={album.artista}
                        info={'álbum'}
                        icon={<I_menu/>}
                        header_el={"Eliminación de álbum"}
                        details_el={"¿Estas seguro que deseas eliminar el álbum?"}
                        header_des={"Desactivación de álbum"}
                        details_des={"¿Estas seguro que deseas desactivar el álbum?"}
                        artist = {'false'}
                      />
                      : ''
                  );
                }
              )
            }
          </div>
        </section>
        <EditingItem
          key={1}
          index={1}
          title={'Algo'}
          details={"Alguien"}
          info={'álbum'}
          icon={<I_menu/>}
          header_el={"Eliminación de álbum"}
          details_el={"¿Estas seguro que deseas eliminar el álbum?"}
          header_des={"Desactivación de álbum"}
          details_des={"¿Estas seguro que deseas desactivar el álbum?"}
        />
      </section>
    </section>
  );
}

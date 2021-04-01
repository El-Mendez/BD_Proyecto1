import React, { useEffect, useState } from 'react';
import {BsSearch as I_search} from 'react-icons/bs';
import Axios from 'axios';

export function searchNav() {

  const get_song = 'http://3.135.234.254:3000/getSpecificSong'

  const [search, setSearch] = useState('')

  const [songs, setSongs] = useState(0);
  const [lAlbums, setLalbums] = useState([]);
  const [lArtists, setLartists] = useState([]);


  function getSong(){
    console.log("Loading...");
    const fetchData = async (nombre) => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: nombre + '%'
          }
        );
        setSongs(data.length);
        console.log(data)
        console.log('data '+ data.length);
      } catch (error) {
        console.log(error);
      }
      console.log(songs);
    };
    fetchData(search);
  };

  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const onClick = () =>{
    console.log(search)
    if(search !== ''){
      getSong();
    }else{
      alert('Ingrese algo para buscar')
    }

  }

  return(
    <div className={"d-flex search-container"}>
      <span className={"position-absolute mx-2"}><I_search/></span>
      <input className={"search-input"}
             type="text"
             maxLength={"80"}
             name={'search'}
             placeholder={"Artist, songs or albums"}
             onChange={handleInputChange}
      />
      <button className={'btn upgrade-btn ml-4'} onClick={onClick}>
        BUSCAR
      </button>
    </div>
  );
}




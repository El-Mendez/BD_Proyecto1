import React, { useEffect, useState } from 'react';
import {BsSearch as I_search} from 'react-icons/bs';
import Axios from 'axios';
import SearchSongs from './searchSongs';
import SearchAlbums from './searchAlbums';
import SearchArtist from './searchArtist';

export default function searchNav() {

  const get_song = 'http://3.135.234.254:3000/getSpecificSong'
  const get_artist = 'http://3.135.234.254:3000/SpecificArtist'
  const get_album = 'http://3.135.234.254:3000/getSpecificAlbum'

  const [search, setSearch] = useState('');
  const [lsongs, setLsongs] = useState([]);
  const [lalbums, setLalbumns] = useState([]);
  const [lartists, setLartists] = useState([]);


  //Search songs
  function getSong(){
    console.log("Loading...");
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: search + '%'
          }
        );
        setLsongs(data)
        setLsongs( (state) => {
          console.log(state); //

          return state;
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  //Search album
  function getAlbum(){
    console.log("Loading...");
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_album,
          {
            album: search + '%'
          }
        );
        console.log(data)
        setLalbumns(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  //Search artist
  function getArtist(){
    console.log("Loading...");
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_artist,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setLartists(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleInputChange = (e) =>{
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const onClick = () =>{
    console.log(search)
    if(search !== ''){
      getSong();
      getAlbum();
      getArtist();
    }else{
      alert('Ingrese algo para buscar')
    }

  }

  return(
      <div className={'view-container'}>
        <div id={'topBar-space'}>
          <div className={'top-bar'}>
            <header className={'header-bar headerSearch-bar'}>
              <div className={"d-flex search-container"}>
                <span className={"position-absolute mx-2"}><I_search/></span>
                <input className={"search-input"}
                       type="text"
                       maxLength={"80"}
                       name={'search'}
                       placeholder={"Artist, songs or albums"}
                       onChange={handleInputChange}
                />
                <button className={'btn-zoa upgrade-btn ml-4'} onClick={onClick}>
                  BUSCAR
                </button>
              </div>
            </header>
          </div>
        </div>
        <section>
          <div className="home-container">
            <SearchSongs
              lsongs={lsongs}/>
          </div>
        </section>
        <section>
          <div className="home-container">
            <SearchAlbums
              lalbums={lalbums}/>
          </div>
        </section>
        <section>
          <div className="home-container">
            <SearchArtist
              lartists={lartists}/>
          </div>
        </section>
      </div>
  );
}





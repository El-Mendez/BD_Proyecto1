import React, { useEffect, useState } from 'react';
import {BsSearch as I_search} from 'react-icons/bs';
import Axios from 'axios';
import SearchSongs from './searchSongs';
import SearchAlbums from './searchAlbums';
import SearchArtist from './searchArtist';
import SearchPlaylist from './searchPlaylist';

export default function searchNav() {

  const get_song = 'http://3.135.234.254:3000/getSpecificSong'
  const get_artist = 'http://3.135.234.254:3000/SpecificArtist'
  const get_album = 'http://3.135.234.254:3000/getSpecificAlbum'
  const get_playlist = 'http://3.135.234.254:3000/getSpecificPlaylist'

  const [search, setSearch] = useState('');
  const [lsongs, setLsongs] = useState([]);
  const [lalbums, setLalbumns] = useState([]);
  const [lartists, setLartists] = useState([]);
  const [lplaylists, setLplaylists] = useState([]);


  //Search songs
  function getSong(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: search + '%'
          }
        );
        setLsongs(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  //Search album
  function getAlbum(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_album,
          {
            album: search + '%'
          }
        );
        setLalbumns(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  //Search artist
  function getArtist(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_artist,
          {
            nombre: search + '%'
          }
        );
        setLartists(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  //Search playlist
  function getArtist(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_playlist,
          {
            nombre: search + '%'
          }
        );
        setLplaylists(data)
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
      setLartists([]);
      setLalbumns([]);
      setLsongs([]);
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
        {
          (lsongs.length>0)? <section>
            <div className="home-container">
              <SearchSongs
                lsongs={lsongs}/>
            </div>
          </section> : ''
        }
        {
          (lalbums.length>0)? <section>
            <div className="home-container">
              <SearchAlbums
                lalbums={lalbums}/>
            </div>
          </section> : ''
        }
        {
          (lartists.length>0)? <section>
            <div className="home-container">
              <SearchArtist
                lartists={lartists}/>
            </div>
          </section> : ''
        }
        {
          (lplaylists.length>0)? <section>
            <div className="home-container">
              <SearchPlaylist
                lplaylists={lplaylists}/>
            </div>
          </section> : ''
        }
      </div>
  );
}





import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import PlaylistItem from '../utils/itemComponents/playlistItem';

export default function Library(){
  let { user } = useParams();

  const get = 'http://3.135.234.254:3000/getPlaylistByUsername'
  const [playlist, setPlaylist] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await Axios.post(get,
        {
          username: user
        }
      );
      setPlaylist(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[setPlaylist])

  return (
    <section className={'library-container m-4'}>
      <div id="discography" className="section-title text-secondary">
        <h3>
          <em>
            La buena música, no tiene una fecha de expiración
          </em>
        </h3>
      </div>
      <div id="albums" className={'grid-container overflow-hidden'} style={{'--minimumColumnWidth': '240px', rowGap: '16px'}}>
        {
          playlist.map((item) => {
            const index = playlist.indexOf(item);
            return(
              <PlaylistItem
                key={index}
                name={item.nombre}
              />
            );
          })
        }
      </div>
    </section>
  );
}

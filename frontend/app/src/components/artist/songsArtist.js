import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SongItem from '../utils/itemComponents/songItem'

export default function SongsArtist(props){
  const artist = props;
  const get = 'http://3.135.234.254:3000/songByArtist'
  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get,
          {
            nombre: artist.artist_name
          }
        );
        setSongs(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  })


  return(
      <section className={'section-container'}>
        <div id="discography" className="section-title text-secondary">
          <h2 className="title">
            Canciones
          </h2>
        </div>
        <div id="songs">
          {
            songs.map((song) => {
              const index = songs.indexOf(song)
              return(
                <SongItem
                key={index}
                song_index={index}
                song_title={song.nombre}
                />
              );
            })
          }
        </div>
      </section>
  );
}

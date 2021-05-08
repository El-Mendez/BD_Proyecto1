import React, { useState } from 'react';
import ArtistItem from "../../utils/itemComponents/artistItem";
import reportRequest from '../../utils/reportsRequest';

//ON HOVER SHOW HOW MANY SONGS THE ARTIST HAS

export default function artistReport(){
  const get = 'http://3.135.234.254:3000/reports/topArtist';
  const [biggerArtists, setBiggerArtists] = useState([]);

  //Request to the api for the artists with more songs
  reportRequest(get, setBiggerArtists);

  return(
    <section className={'section-container'}>
      <div className="section-title text-secondary">
        <h2 className="title">
          Artistas con mayor producción musical
        </h2>
      </div>
      <div id="biggerArtists" className="songs-container">
        {
          biggerArtists.map((artist) => {
            const index = biggerArtists.indexOf(artist)
            return(
                <ArtistItem
                key={index}
                userName = {artist.nombre}
                details={artist.canciones + ' canciones'}/>
            );
          })
        }
      </div>
    </section>
  );
}

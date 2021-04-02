import React, { useState } from 'react';
import ArtistItem from "../../utils/itemComponents/artistItem";
import reportRequest from '../../utils/reportsRequest';

export default function artistReport(){
    const get = 'http://3.135.234.254:3000/reports/growingArtists';
    const [growingArtists, setGrowingartists] = useState([]);

    //Request to the api for the growing Artists
    reportRequest(get, setGrowingartists);

    return(
      <section className={'section-container'}>
          <div className="section-title text-secondary">
              <h2 className="title">
                  Artistas con popularidad creciente
              </h2>
          </div>
          <div id="growingArtists" className="songs-container">
              {
                  growingArtists.map((artist) => {
                    const index = growingArtists.indexOf(artist);
                    return(
                      <ArtistItem
                        key={index}
                        userName = {artist.nombre}/>
                    );
                  })
              }
          </div>
      </section>
    );
}

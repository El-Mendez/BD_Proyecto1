import React, { useState } from 'react';
import AlbumItem from '../../utils/itemComponents/albumItem'
import reportRequest from '../../utils/reportsRequest';

export default function AlbumsReport(){
  const get = 'http://3.135.234.254:3000/reports/weeklyAlbums';
  const [albums, setAlbums] = useState([]);

  //Request the weekly most recent albums
  reportRequest(get, setAlbums);

  return(
    <section className={'section-container'}>
      <div className="section-title text-secondary">
        <h2 className="title">
          Álbumes más recientes de la última semana
        </h2>
      </div>
      <div id="albums" className="songs-container">
        {
          albums.map((album) => (
            <AlbumItem
              key={album.id}
              a_name={album.albumes}
              a_date={album.artista}
            />
          ))
        }
      </div>
    </section>
  );
}

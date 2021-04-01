import React from 'react';
import AlbumItem from '../../utils/itemComponents/albumItem'

export default function AlbumsReport(props){
  const sAlbums = props;
  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Álbumes
        </h2>
        <div>Ver mas</div>
      </div>
      <div id="albums" className="songs-container">
        {
          sAlbums.lalbums.map((album) => (
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

import React from 'react';
import ArtistItem from '../../utils/itemComponents/artistItem'


export default function SearchArtist(props){
  const sArtists = props;
  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Artistas
        </h2>
      </div>
      <div id="albums" className="songs-container">
        {
          sArtists.lartists.map((artist) => {
            const index = sArtists.lartists.indexOf(artist);
            return(
              <ArtistItem
                key={index}
                userName={artist.nombre}
              />
            );
        })
        }
      </div>
    </section>
  );
}

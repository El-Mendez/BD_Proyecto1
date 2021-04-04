import React from 'react';
import GenreItem from '../../utils/itemComponents/genreItem'

export default function SearchGenres(props){
  const sGenres = props;
  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Géneros
        </h2>
      </div>
      <div id="genres" className="songs-container">
        {
          sGenres.lgenres.map((genre) => {
            const index = sGenres.lgenres.indexOf(genre)
            return(
              <Genre
                key={index}
                genre={genre.nombre}
              />
            );
          })
        }
      </div>
    </section>
  );
}

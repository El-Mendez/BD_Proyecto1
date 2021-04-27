import React, {useState} from 'react';
import GenreItemreport from "../../utils/itemComponents/genreItem";
import reportRequest from '../../utils/reportsRequest';

// CHANGE ACTION ON HOVER, USE AN INVISIBLE COMPONENT TO SHOW HOW MANY SONGS THAT GENDER HAS

export default function genresReport() {

  const get = 'http://3.135.234.254:3000/reports/topGenres';
  const [topGenres, setTopgenres] = useState([]);

  //Request to the api for the most popular genres
  reportRequest(get, setTopgenres);

    return(
      <section className={'section-container'}>
        <div id="artists" className="section-title text-secondary">
          <h2 className="title">
            Géneros más populares
          </h2>
        </div>
        <div id="growingArtists" className="d-flex flex-wrap justify-content-between">
          {
            topGenres.map((genres) => {
              const index = topGenres.indexOf(genres)
              return (
                <GenreItemreport
                  key={index}
                  genre={genres.nombre}/>
              );
            })
          }
        </div>
      </section>
    );
}

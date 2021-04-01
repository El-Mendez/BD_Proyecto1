import React from 'react';
import Song from '../../utils/song'

export default function SearchSongs(props){

  const sSongs = props;

  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Canciones
        </h2>
        <div>Ver mas</div>
      </div>
      <div id="songs">
        {
          sSongs.lsongs.map((song) => (
            <Song
              key={song.id}
              song_index={song.id}
              song_t={song.cancion}
              song_a={song.artista}
            />
          ))
        }
      </div>
    </section>
  );
}

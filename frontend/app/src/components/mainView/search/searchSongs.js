import React from 'react';
import SongItem_artist from '../../utils/itemComponents/songItem_artist'

export default function SearchSongs(props){

  const sSongs = props;

  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Canciones
        </h2>
      </div>
      <div id="songs">
        {
          sSongs.lsongs.map((song) => {
            const index = sSongs.lsongs.indexOf(song);
            return(
              song.estado?
              <SongItem_artist
                key={index}
                song_index={index + 1}
                song_t={song.cancion}
                song_a={song.artista}
              /> : ''
            );
          })
        }
      </div>
    </section>
  );
}

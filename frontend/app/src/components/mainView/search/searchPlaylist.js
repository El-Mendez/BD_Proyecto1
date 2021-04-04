import React from 'react';
import PlaylistItem from '../../utils/itemComponents/playlistItem';

export default function SearchPlaylist(props){
  const sPlaylists = props;
  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Álbumes más recientes de la última semana
        </h2>
        <div>Ver mas</div>
      </div>
      <div id="albums" className="songs-container">
        {
          sPlaylists.lplaylists.map((playlist) => {
            const index = sAlbums.lalbums.indexOf(playlist)
            return(
              <PlaylistItem
                key={index}
                name={playlist.playlist}
              />
            );
          })
        }
      </div>
    </section>
  );
}

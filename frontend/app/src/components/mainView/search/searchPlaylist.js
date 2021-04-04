import React from 'react';
import PlaylistItem from '../../utils/itemComponents/playlistItem';

export default function SearchPlaylist(props){
  const sPlaylists = props;
  return(
    <section className={'section-container'}>
      <div id="discography" className="section-title text-secondary">
        <h2 className="title">
          Playlists
        </h2>
      </div>
      <div id="albums" className="songs-container">
        {
          sPlaylists.lplaylists.map((playlist) => {
            const index = sPlaylists.lplaylists.indexOf(playlist)
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

import React from 'react';
import AlbumsArtist from './albumsArtist';
import SongsArtist from './songsArtist';

export default function Artist(){
  return(
    <div>
        <h1 className="m-4 text-secondary">
          ARTIST NAME
        </h1>
      <div className={"home-container"}>
        <SongsArtist/>
        <AlbumsArtist/>
      </div>
    </div>
  );

}

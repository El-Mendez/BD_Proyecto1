import React from 'react';
import AlbumsArtist from './albumsArtist';
import SongsArtist from './songsArtist';
import { useParams } from 'react-router-dom';

export default function Artist(){
  let { artist } = useParams();

  return(
    <div className={'overflow-auto'}>
        <h1 className="m-4 text-secondary">
          {artist}
        </h1>
      <div className={"home-container"}>
        <SongsArtist
        artist_name={artist}/>
        <AlbumsArtist
        artist_name={artist}/>
      </div>
    </div>
  );

}

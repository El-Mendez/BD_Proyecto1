import React from 'react';
import SongItem from './songItem'

export default function Songs(){
  return(
      <section className={'section-container'}>
        <div id="discography" className="section-title text-secondary">
          <h2 className="title">
            Canciones
          </h2>
          <div>Ver mas</div>
        </div>
        <div id="songs">
          <SongItem/>
          <SongItem/>
        </div>
      </section>
  );
}

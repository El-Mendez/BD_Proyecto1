import React from 'react';
import AlbumItem from '../utils/itemComponents/albumItem'

export default function AlbumsArtist(props){
  const artist = props;
  return(
      <section className={'section-container'}>
          <div id="discography" className="section-title text-secondary">
           <h2 className="title">
             Discografía
           </h2>
          </div>
        <div id="albums" className="songs-container">
          <AlbumItem
          a_name={'Testing'}
          a_date={'2018'}/>
        </div>
      </section>
  );
}

import React, { useState, useEffect }from 'react';
import Axios from 'axios';
import AlbumItem from '../utils/itemComponents/albumItem'

//CHANGE THE YEAR WITH THE NEW FUNCTION THAT RETURNS YEAR

export default function AlbumsArtist(props){
  const artist = props;

  const get = 'http://3.135.234.254:3000/getAlbumByArtist'
  const [albums, setAlbums] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get,
          {
            nombre: artist.artist_name
          }
        );
        setAlbums(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setAlbums])


  return(
      <section className={'section-container'}>
          <div id="discography" className="section-title text-secondary">
           <h2 className="title">
             Discografía
           </h2>
          </div>
        <div id="albums" className="songs-container">
          {
            albums.map((album) => {
              const index = albums.indexOf(album)
              return(
                <AlbumItem
                  key={index}
                  a_name={album.album}
                  a_date={'2018'}/>
              );
            })
          }
        </div>
      </section>
  );
}

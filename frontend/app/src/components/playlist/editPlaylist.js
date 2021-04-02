import React from 'react';
import image from '../../assets/badLiar.jpg'
import SongItem from './songPlaylist';
import {BsTrash as I_delete,
  BsPlus as I_add,
  BsSearch as I_search} from 'react-icons/bs';

export default function EditPlaylist(){
  return(
    <section className={'overflow-auto'}>
      <div className={'playlist-container'}>
        <div className={"playlist-block"} style={{backgroundColor: '#d8d0c0'}}>
          <div className={"playlist-block playlist-bg"}/>
        </div>
        {/* IMAGE */}
        <div className="_pI1">
          <div className="_pI2">
              <div className="w-100 h-100">
                <img src={image} alt="Playlist Image" className={"playlist-image"} width={"100%"} height={"100%"}/>
              </div>
          </div>

        </div>
        <div className="_pD1">
          <h6>PLAYLIST</h6>
          <h2>Playlist Name</h2>
          <p>Username • 10 canciones</p>
        </div>
      </div>
      {/* ACTUAL SONGS */}
      <div className={"degraded-container"}>
          <div className="contentSpacing">
              <div id={"actualSongs"} >
                <div className={"row-title"}>
                    <div className={"row-title-grid mt-2 pSong-grid"}>
                      <div className={"pR_title justify-self-end"}>
                        <small>#</small>
                      </div>
                      <div className={"pR_title justify-self-star"}>
                        <small>TITLE</small>
                      </div>
                        <div className={"pR_title justify-self-star"}>
                          <small>ALBUM</small>
                        </div>
                        <div className={"pR_title justify-self-end"}>
                          <small>•••</small>
                        </div>

                    </div>
                </div>
                <section className={'mb-4'}>
                  <div id="songs">
                    <SongItem
                      song_index={1}
                      song_t={"Nose"}
                      song_a={"Saber"}
                      song_album={"Love Goes"}
                      I_options={<I_delete/>}
                    />
                  </div>
                </section>
              </div>
          </div>
      </div>
      {/* SEARCH SONG FOR THE PLAYLIST */}
      <section className={"search-songs"}>
        <div className={"d-inline-block"}>
          <h5 className={'text-secondary mb-3'}>Encontremos algo para tu playlist</h5>
          <div className={"d-flex search-container"}>
            <div className={"d-flex"} style={{background: '#ffffff1a'}}>
              <span className={"mx-2 text-secondary"}><I_search/></span>
              <input className={"sP-search"}
                     type={"text"}
                     maxLength={"80"}
                     name={'search'}
                     placeholder={"Nombre de la cancion"}/>
            </div>
            <button className={'btn upgrade-btn ml-4'}>
              BUSCAR
            </button>
          </div>
        </div>
        {/* CANCIONES ENCONTRADAS */}
        <section className={'my-4'}>
          <div id="songs">
            <SongItem
              song_index={1}
              song_t={"Nose"}
              song_a={"Saber"}
              song_album={"Love Goes"}
              I_options={<I_add/>}
            />
          </div>
        </section>
      </section>
    </section>
  );
}

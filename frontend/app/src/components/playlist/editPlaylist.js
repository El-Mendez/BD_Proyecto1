import React from 'react';
import image from '../../assets/badLiar.jpg'

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
      <div className={"degraded-container"}>
        <div className={"degraded-bg"} style={{backgroundColor: '#d8d0c0'}}/>
          <div className="contentSpacing">
              <div id={"actualSongs"} >
                <div className={"row-title"}>
                    <div className={"row-title-grid"}>

                    </div>
                </div>
              </div>
          </div>
      </div>

    </section>
  );
}

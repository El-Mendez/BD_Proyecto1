import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';
import test from '../../../assets/badLiar.jpg'

export default function playlistItem(props) {

  let { url } = useRouteMatch();
  const playlist = props;

  const handleClick = () =>{
    history.push(`${url}/editPlaylist/${playlist.name}`);
    history.go();
  }

  return (
    <div className="library-item cursor" onClick={handleClick}>
      <div className={"d-flex"}>
        <div style={{width: "80px", height: "80px"}}>
          <div className={"image-shadow"}>
            <img src={test} alt="Playlist Image" className={"w-100 h-100"}/>
          </div>
        </div>
        <div className={"library-info"}>
          <h6 className={"text-secondary"}>{playlist.name}</h6>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import image from "../../../assets/badLiar.jpg";
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';

export default function AlbumItem(props) {
  let { url } = useRouteMatch();
  const album = props;

  const handleClick = () =>{
    history.push(`${url}/albums/${album.a_name}`);
    history.go();
  }

    return(
      <div className="item-card card" onClick={handleClick}>
        <div className="image-container">
          <div className="image-shadow">
            <img src={image} className="image-top" alt="TEST"/>
          </div>
        </div>
        <div className="card-body p-1 mt-1 text-secondary w-100">
          <p className="card-song-title">{album.a_name}</p>
          <p className="card-text mt-1">{album.a_date} • Album</p>
        </div>
      </div>
    );
}


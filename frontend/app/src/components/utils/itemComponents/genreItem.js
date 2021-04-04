import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import history from '../../history';

export default function genreItem(props) {

  let { url } = useRouteMatch();
  const genre = props;

  const handleClick = () =>{
  history.push(`${url}/genres/${genre.genre}`);
  history.go();
  }

  return(
      <div className="card genre-card genre-bg mb-2 cursor" onClick={handleClick}>
          <div className="card-body d-flex justify-content-center">
              <h1 className={'align-self-center cursor'}>{genre.genre}</h1>
          </div>
      </div>
  );
}

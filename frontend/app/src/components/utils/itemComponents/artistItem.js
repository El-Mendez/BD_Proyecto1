import React from 'react';
import test from '../../../assets/badLiar.jpg'
import history from '../../history';
import { useRouteMatch } from 'react-router-dom';

export default function artistItem(props) {
  let { url } = useRouteMatch();
  const artist = props;

  const handleClick = () =>{
    history.push(`${url}/artists/${artist.userName}`);
    history.go();
  }

    return(
        <div className={'thumbnail-col cursor'} onClick={handleClick}>
            <img src={test} className={'rounded-circle thumbnail-artist'}/>
            <h6 className={'text-center text-secondary'}>{artist.userName}</h6>
        </div>
    );
}

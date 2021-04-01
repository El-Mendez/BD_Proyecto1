import React from 'react';
import { BsPeopleCircle as I_user } from 'react-icons/bs';
import { createBrowserHistory as history } from 'history';

export default function homeBar() {

  const handleClick = () =>{
    console.log('just testing')
    console.log(history().location);
    history().push('/user');
    history().go();
    console.log(history().location);
  }

    return(
        <div className={'top-bar'}>
            <header className={'header-bar'}>
              <div>
                <button className={'btn upgrade-btn'}>
                  PREMIUM
                </button>
                <button className={'btn user-btn ml-4'} onClick={handleClick}>
                  <span className={'i-user mr-2'}>
                    <I_user/>
                  </span>
                  username
                </button>
              </div>
            </header>
        </div>
    );
}

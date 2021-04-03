import React from 'react';
import { useParams } from 'react-router-dom';
import { BsPeopleCircle as I_user } from 'react-icons/bs';
import { createBrowserHistory as history } from 'history';
import Upgrade from './upgrade';

export default function homeBar(props) {

  const username = props;
  const [modalShow, setModalShow] = React.useState(false);
  let { user } = useParams();

  const handleClick = () =>{
    console.log('just testing')
    console.log(history().location);
    history().push(`/user/${user}`);
    history().go();
    console.log(history().location);
  }

    return(
        <div className={'top-bar'}>
            <header className={'header-bar'}>
              <div>
                <button className={'btn btn-zoa upgrade-btn'} onClick={() => setModalShow(true)}>
                  PREMIUM
                </button>
                <Upgrade
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <button className={'btn btn-zoa user-btn ml-4'} onClick={handleClick}>
                  <span className={'i-user mr-2'}>
                    <I_user/>
                  </span>
                  {username.user_name}
                </button>
              </div>
            </header>
        </div>
    );
}

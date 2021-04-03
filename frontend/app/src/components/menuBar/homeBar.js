import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsPeopleCircle as I_user } from 'react-icons/bs';
import { createBrowserHistory as history } from 'history';
import Upgrade from './upgrade';
import Axios from 'axios';

export default function homeBar(props) {

  const username = props;
  const [modalShow, setModalShow] = React.useState(false);
  let { user } = useParams();

  const get_user = 'http://3.135.234.254:3000/getUserDescription'
  const [premium, setPremium] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await Axios.post(get_user,
          {
            username: user
          })
        if (data[0].descripcion === 'Admin' || data[0].descripcion === 'Premium'){
          setPremium (false);
        }
      }catch (e){
        console.log(e)
      }
    };
    fetchData();
  })



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
                {
                  premium? <button className={'btn btn-zoa upgrade-btn'} onClick={() => setModalShow(true)}>
                    PREMIUM
                  </button> : ''
                }
                {/* Modal for the upgrade data */}
                <Upgrade
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <button className={'btn btn-zoa user-btn ml-4 i-user'} onClick={handleClick}>
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

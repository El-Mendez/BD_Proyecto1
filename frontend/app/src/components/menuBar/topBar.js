import React from 'react';
import {BsPeopleCircle as I_user} from 'react-icons/bs';

export default function topBar() {
    return(
        <div className={'top-bar'}>
            <header className={'header-bar'}>

                <button className={'btn upgrade-btn'}>
                    PREMIUM
                </button>

                <button className={'btn user-btn ml-4'}>
                    <span className={'i-user mr-2'}>
                        <I_user/>
                    </span>
                     username
                </button>

            </header>
        </div>
    );
}

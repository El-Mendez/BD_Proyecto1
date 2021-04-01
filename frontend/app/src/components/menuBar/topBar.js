import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import UpgradeNav from './upgradeNav';
import {searchNav as SearchNav} from './searchNav';

export default function topBar() {
  const match = useRouteMatch("/home")

    return(
        <div className={'top-bar'}>
            <header className={'header-bar ' + (match?'headerSearch-bar':'')}>
              {match.isExact? <UpgradeNav/>:<SearchNav/>}
            </header>
        </div>
    );
}

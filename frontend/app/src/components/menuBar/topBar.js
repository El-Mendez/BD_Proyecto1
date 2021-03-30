import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import UpgradeNav from './upgradeNav';
import SearchNav from './searchNav';

export default function topBar() {
  const match = useRouteMatch("/dashboard")

    return(
        <div className={'top-bar'}>
            <header className={'header-bar ' + (match?'headerSearch-bar':'')}>
              {match.isExact? <SearchNav/>:<SearchNav/>}
            </header>
        </div>
    );
}

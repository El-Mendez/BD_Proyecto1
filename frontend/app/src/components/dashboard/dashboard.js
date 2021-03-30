import React, {useState} from 'react';
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import TopBar from '../menuBar/topBar';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import GenderSongs from '../mainView/genderSongs';
import Search from '../mainView/search';

export default function dashboard(){

        let match = useRouteMatch();


        return(
            <div id={'main-container'}>
                <div className={'dash-container'}>
                    <SideBar />
                    <TopBar />
                    <div className={'view-container'}>
                        <div id={'topBar-space'}></div>
                       <Search/>
                    </div>
                    <div className={'player-container'}>
                        <Player/>
                    </div>
                </div>
            </div>

        );

}



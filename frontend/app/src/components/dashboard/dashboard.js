import React from 'react';
import SideBar from "../sideBar/sideBar";
import Player from "../player/Player";
import GenderSongs from '../home/genderSongs';
import Home from "../home/home";
import Report from '../report/report'

export default function dashboard(){
    return(
        <div className={'d-flex'}>
            <SideBar/>
            <div className={'songs-views'}>
                <Home/>
            </div>
            <div className={'player-fixed'}>
                <Player
                    videoId="An7Q1GkEf3g"
                    name="Sucker For Pain"
                    artist="Imagine Dragons"/>
            </div>
        </div>
    );
}
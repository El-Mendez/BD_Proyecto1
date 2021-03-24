import React from 'react';
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import View from "../view/view";
import TopBar from '../menuBar/topBar';
//Tambien importar navbar
import Report from '../report/report'

export default function dashboard(){
    return(
        <div id={'main-container'}>
            <div className={'dash-container'}>
                <SideBar/>
                <TopBar/>

                <div className={'view-container'}>
                    <div id={'topBar-space'}></div>
                    <View/>
                </div>

                <div className={'player-container'}>
                    <Player
                        videoId="An7Q1GkEf3g"
                        name="Sucker For Pain"
                        artist="Imagine Dragons"/>
                </div>
            </div>
        </div>

    );
}
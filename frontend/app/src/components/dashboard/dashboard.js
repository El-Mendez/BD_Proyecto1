import React, {useState} from 'react';
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import View from "../view/view";
import TopBar from '../menuBar/topBar';
import GenderSongs from "../view/genderSongs";
//Tambien importar navbar
import Report from '../report/report'

export default class dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            link: '',
            artist: 0
        }
    }

    render(){
        return(
            <div id={'main-container'}>
                <div className={'dash-container'}>
                    <SideBar/>
                    <TopBar/>

                    <div className={'view-container'}>
                        <div id={'topBar-space'}></div>
                        <GenderSongs
                            songPlaying = {(item) => this.songPlaying(item)}
                        />
                    </div>

                    <div className={'player-container'}>
                        <Player
                            videoId={this.state.link}
                            name={this.state.nombre}
                            artist={this.state.artist}/>
                    </div>
                </div>
            </div>

        );
    }

    songPlaying (item) {
        this.setState({
            nombre: item.nombre,
            link: item.link,
            artist: item.id_artista
        })
    }

}



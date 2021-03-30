import React, {useState, useEffect} from 'react';
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import TopBar from '../menuBar/topBar';
import GenderSongs from '../mainView/genderSongs';

const initialState = () =>{
  return{
    song_link: '',
    song_name: '',
    song_artist: ''
  };
};

export default class dashboard extends React.Component{

  constructor(props) {
    super(props);
    this.state = initialState();
  }

  render(){
    console.log(this.state.song_name)
    return(
      <div id={'main-container'}>
        <div className={'dash-container'}>
          <SideBar />
          <TopBar />
          <div className={'view-container'}>
            <div id={'topBar-space'}></div>
            <GenderSongs
              songPlaying = {(song) => this.songPlaying(song)}/>
          </div>
          <div className={'player-container'}>
            <Player
            videoId={"DLgzY8uL86U"} //Cuando paso el estate de link, no le da play
            name={this.state.song_name}
            artist={this.state.song_artist}/>
          </div>
        </div>
      </div>

    );
  }

  songPlaying(song){
    if(song != undefined){
      this.setState({
        song_link: song.link,
        song_name: song.cancion_nombre,
        song_artist: song.artista_nombre,
      })
    }
  };

}





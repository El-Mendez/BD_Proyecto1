import React, {useState} from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import TopBar from '../menuBar/topBar';
import HomeView from '../mainView/homeView';
import Artist from '../artist/artis';


export default function dashboard() {

  const [song, setSong] = useState({
    song_link: '',
    song_name: '',
    song_artist: ''
  })

  let {path} = useRouteMatch();

  const songPlaying = (a_song) =>{
    if(a_song != undefined){
      setSong({
        ...song,
        song_link: a_song.link,
        song_name: a_song.cancion_nombre,
        song_artist: a_song.artista_nombre,
      })
    }
  };

    return(
      <div id={'main-container'}>
        <div className={'dash-container'}>
          <SideBar />
          <TopBar />
          <div className={'view-container'}>
            <div id={'topBar-space'}></div>
            <Switch>
              <Route path={`${path}/report`}>
                {/*<Report/>*/}
              </Route>
              <Route path={`${path}/playlist`}>
               <h2>Playlists</h2>
              </Route>
              <Route path={`${path}/search`}>
                <Artist/>
              </Route>
              <Route exact paht={path}>
                <HomeView
                  songPlaying = {(song) => songPlaying(song)}/>
              </Route>
            </Switch>
          </div>
          <div className={'player-container'}>
            <Player
            videoId={song.song_link}//Cuando paso el estate de link, no le da play
            name={song.song_name}
            artist={song.song_artist}/>
          </div>
        </div>
      </div>

    );

}





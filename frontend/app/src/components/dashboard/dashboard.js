import React, {useState, useEffect} from 'react';
import {
  Switch,
  Route,
  useParams,
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

  // const songPlaying = (a_song) =>{
  //   if(a_song != undefined){
  //     setSong({
  //       ...song,
  //       song_link: a_song.link,
  //       song_name: a_song.cancion_nombre,
  //       song_artist: a_song.artista_nombre,
  //     })
  //   }
  // };

    //console.log(this.state.song_name)
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
                  songPlaying = {(song) => this.songPlaying(song)}/>
              </Route>
            </Switch>
          </div>
          <div className={'player-container'}>
            <Player
            videoId={"DLgzY8uL86U"} />
          </div>
        </div>
      </div>

    );

}





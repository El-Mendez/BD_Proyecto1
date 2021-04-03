import React, {useState} from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SideBar from "../menuBar/sideBar";
import Player from "../player/Player";
import HomeView from '../mainView/homeView';
import Search from '../mainView/search/search';
import Report from '../report/report'
import CreatePlaylist from '../playlist/createPlaylist';
import EditPlaylist from '../playlist/editPlaylist';
import Artist from '../artist/artis';
import Library from '../playlist/library';


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
            <Switch>
              <Route  path={`${path}/search/artists/:artist`}>
                <Artist/>
              </Route>
              <Route path={`${path}/library/editPlaylist/:playlist`}>
                <EditPlaylist/>
              </Route>
              <Route path={`${path}/editPlaylist/:playlist`}>
                <EditPlaylist/>
              </Route>
              <Route path={`${path}/report`}>
                <Report/>
              </Route>
              <Route path={`${path}/library`}>
                <Library/>
              </Route>
              <Route path={`${path}/playlist`}>
               <h2>Playlists</h2>
                <CreatePlaylist/>
              </Route>
              <Route path={`${path}/search`}>
                <Search/>
              </Route>
              <Route exact paht={{path}} children={
                <HomeView
                  songPlaying = {(song) => songPlaying(song)}/>
              }>

              </Route>
            </Switch>
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





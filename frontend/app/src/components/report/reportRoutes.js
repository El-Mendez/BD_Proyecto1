import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ArtistReport from './reports/artistReport'
import UsersReport from "./reports/usersReport";
import GenresReport from "./reports/genresReport";
import AlbumsReport from "./reports/albumsReport";
import MonthsReport from "./reports/newSubsReport";


export default function ReportRoute(){

  let {path} = useRouteMatch();

  return(
    <div>
      <Switch>
        <Route  path={`${path}/recentAlbums`}>
          <AlbumsReport/>
        </Route>
        <Route  path={`${path}/famousArtists`}>
          <ArtistReport/>
        </Route>
        <Route  path={`${path}/newSubscriptions`}>
          <MonthsReport/>
        </Route>
        <Route  path={`${path}/biggerArtists`}>
          <ArtistReport/>
        </Route>
        <Route  path={`${path}/popularGenders`}>
          <GenresReport/>
        </Route>
        <Route  path={`${path}/activeUsers`}>
          <UsersReport/>
        </Route>
      </Switch>
    </div>
  );
}

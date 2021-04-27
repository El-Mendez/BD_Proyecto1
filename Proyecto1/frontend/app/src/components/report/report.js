import React from 'react';
import ReportItem from '../utils/itemComponents/reportItem';
import albums from '../../assets/recentAlbums.jpg';
import famousArtists from '../../assets/famousArtis.png';
import biggerArtists from '../../assets/artists.jpg';
import genres from '../../assets/genres.jpg';
import subscriptions from '../../assets/newSubscriptions.jpg';
import activeUsers from '../../assets/activeUsers.jpg';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AlbumsReport from './reports/albumsReport';
import ArtistsReport from './reports/artistReport';
import BArtistsReport from './reports/bartistsReport';
import MonthsReport from './reports/newSubsReport';
import GenresReport from './reports/genresReport';
import UsersReport from './reports/usersReport';


export default function Report(){
  let {path, url} = useRouteMatch();

  return (
    <div className={'overflow-auto'}>
      <div className={'container-fluid mt-2'}>
        <h1 className={'text-secondary'}>Reportes</h1>
        <div className={'d-flex flex-wrap justify-content-around'}>
          <ReportItem
            image={albums}
            title={'Álbumes'}
            description={'Álbumes recientes de la semana'}
            redirect={`${url}/recentAlbums`}
          />
          <ReportItem
            image={famousArtists}
            title={'Artistas'}
            description={'Artistas con popularidad creciente en los últimos 3 meses'}
            redirect={`${url}/famousArtists`}/>
          <ReportItem
            image={biggerArtists}
            title={'Artistas'}
            description={'Artistas con mayor producción musical'}
            redirect={`${url}/biggerArtists`}/>
          <ReportItem
            image={genres}
            title={'Géneros'}
            description={'Géneros más populares'}
            redirect={`${url}/popularGenres`}/>
          <ReportItem
            image={subscriptions}
            title={'Suscripciones'}
            description={'Nuevas suscripciones en los últimos seis meses'}
            redirect={`${url}/newSubscriptions`}/>
          <ReportItem
            image={activeUsers}
            title={'Usuarios'}
            description={'Usuarios más activos'}
            redirect={`${url}/activeUsers`}/>
        </div>
      </div>
      <section className={'section-container home-container'}>
            <div id="songs">
              <Switch>
                <Route  path={`${path}/recentAlbums`}>
                  <AlbumsReport/>
                </Route>
                <Route  path={`${path}/famousArtists`}>
                  <ArtistsReport/>
                </Route>
                <Route  path={`${path}/newSubscriptions`}>
                  <MonthsReport/>
                </Route>
                <Route  path={`${path}/biggerArtists`}>
                  <BArtistsReport/>
                </Route>
                <Route  path={`${path}/popularGenres`}>
                  <GenresReport/>
                </Route>
                <Route  path={`${path}/activeUsers`}>
                  <UsersReport/>
                </Route>
                <Route  path={path}/>
              </Switch>
            </div>
          </section>
    </div>
  );
}

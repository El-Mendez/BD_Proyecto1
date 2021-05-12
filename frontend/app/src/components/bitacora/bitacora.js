import React from 'react';
import ReportItem from '../utils/itemComponents/reportItem';
import albums from '../../assets/recentAlbums.jpg';
import users from '../../assets/activeUsers.jpg';
import ChangesDatabase from './changes/changesDatabase'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function bitacora (props) {
    let {path, url} = useRouteMatch();

    return (
        <div className={'overflow-auto'}>
      <div className={'container-fluid mt-2'}>
        {/* Opciones de reporte */}
        <h1 className={'text-secondary'}>Bitacora</h1>
        <div className={'d-flex flex-wrap'}>
          <ReportItem
            image={users}
            title={'Usuarios'}
            description={'Ver los cambios que se han hecho en usuarios'}
            redirect={`${url}/changesUsers`}
            click={true}
          />
          <ReportItem
            image={albums}
            title={'Artistas'}
            description={'Ver los cambios que se han hecho en artistas'}
            redirect={`${url}/changesArtist`}
            click={true}
          />
          <ReportItem
            image={albums}
            title={'Álbumes'}
            description={'Ver los cambios que se han hecho en albumes'}
            redirect={`${url}/changesAlbums`}
            click={true}
          />
          <ReportItem
            image={albums}
            title={'Playlist'}
            description={'Ver los cambios que se han hecho en playlist'}
            redirect={`${url}/changesPlaylist`}
            click={true}
          />
          <ReportItem
            image={albums}
            title={'Tracks'}
            description={'Ver los cambios que se han hecho en canciones'}
            redirect={`${url}/changesTracks`}
            click={true}
          />
          <section className={'section-container home-container'}>
            <div id="songs">
              <Switch>
                <Route  path={`${path}/changesUsers`}>
                  <ChangesDatabase
                  title='Usuarios'
                  request='http://3.135.234.254:3000/getChangesUsers'
                  />
                </Route>
              </Switch>
              <Switch>
                <Route  path={`${path}/changesArtist`}>
                  <ChangesDatabase
                  title='Artistas'
                  request='http://3.135.234.254:3000/getChangesArtist'
                  />
                </Route>
              </Switch>
              <Switch>
                <Route  path={`${path}/changesAlbums`}>
                  <ChangesDatabase
                  title='Albumes'
                  request='http://3.135.234.254:3000/getChangesAlbumes'
                  />
                </Route>
              </Switch>
              <Switch>
                <Route  path={`${path}/changesPlaylist`}>
                  <ChangesDatabase
                  title='Playlist y  Playlist_canciones'
                  request='http://3.135.234.254:3000/getChangesPlaylist'
                  />
                </Route>
              </Switch>
              <Switch>
                <Route  path={`${path}/changesTracks`}>
                  <ChangesDatabase
                  title='Canciones'
                  request='http://3.135.234.254:3000/getChangesSongs'
                  />
                </Route>
              </Switch>
            </div>
          </section>
        </div>
      </div>
      {/* Presentación de reportes */}
    </div>
        )

}


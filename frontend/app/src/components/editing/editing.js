import React from 'react';
import ReportItem from '../utils/itemComponents/reportItem';
import albums from '../../assets/recentAlbums.jpg';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SongsEdit from './songsEdit';
import AlbumsEdit from './albumsEdit';
import UsersEdit from './usersEdit';


export default function Editing(){
  let {path, url} = useRouteMatch();

  return (
    <div className={'overflow-auto'}>
      <div className={'container-fluid mt-2'}>
        {/* Opciones de reporte */}
        <h1 className={'text-secondary'}>Edición</h1>
        <div className={'d-flex flex-wrap'}>
          <ReportItem
            image={albums}
            title={'Canciones'}
            description={'Edición de canciones'}
            redirect={`${url}/songsEditing`}
            click={true} />
        <ReportItem
          image={albums}
          title={'Álbumes'}
          description={'Edición de álbumes'}
          redirect={`${url}/albumsEditing`}
          click={true} />
      <ReportItem
        image={albums}
        title={'Usuarios'}
        description={'Edición de usuarios y artistas'}
        redirect={`${url}/usersEditing`}
        click={true} />
      </div>
    </div>
      {/* Presentación de reportes */}
      <section className={'section-container home-container'}>
        <div id="songs">
          <Switch>
            <Route  path={`${path}/songsEditing`}>
              <SongsEdit/>
            </Route>
            <Route  path={`${path}/albumsEditing`}>
              <AlbumsEdit/>
            </Route>
            <Route  path={`${path}/usersEditing`}>
              <UsersEdit/>
            </Route>
            <Route  path={path} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

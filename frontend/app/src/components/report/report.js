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
import RangeDate from './reports/rangeDate';
import ModalArtist from './reports/modalArtist';
import ModalSongsArtists from './reports/modalSongsartists';


export default function Report(){
  let {path, url} = useRouteMatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [modal1Show, setModal1Show] = React.useState(false);
  const [modal2Show, setModal2Show] = React.useState(false);
  const [modal3Show, setModal3Show] = React.useState(false);

  return (
    <div className={'overflow-auto'}>
      <div className={'container-fluid mt-2'}>
        {/* Opciones de reporte */}
        <h1 className={'text-secondary'}>Reportes</h1>
        <div className={'d-flex flex-wrap'}>
          <ReportItem
            image={albums}
            title={'Álbumes'}
            description={'Álbumes recientes de la semana'}
            redirect={`${url}/recentAlbums`}
            click={true}
          />
          <ReportItem
            image={famousArtists}
            title={'Artistas'}
            description={'Artistas con popularidad creciente en los últimos 3 meses'}
            redirect={`${url}/famousArtists`}
            click={true}
          />
          <ReportItem
            image={biggerArtists}
            title={'Artistas'}
            description={'Artistas con mayor producción musical'}
            redirect={`${url}/biggerArtists`}
            click={true}
          />
          <ReportItem
            image={genres}
            title={'Géneros'}
            description={'Géneros más populares'}
            redirect={`${url}/popularGenres`}
            click={true}
          />
          <ReportItem
            image={subscriptions}
            title={'Suscripciones'}
            description={'Nuevas suscripciones en los últimos seis meses'}
            redirect={`${url}/newSubscriptions`}
            click={true}
          />
          <ReportItem
            image={activeUsers}
            title={'Usuarios'}
            description={'Usuarios más activos'}
            redirect={`${url}/activeUsers`}
            click={true}
          />
          <ReportItem
            image={activeUsers}
            title={'Reproducciones semanales'}
            description={'Total de reproducciones por semana'}
            redirect={() => setModalShow(true)}
            click={false}/>
          <RangeDate
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <ReportItem
            image={activeUsers}
            title={'Artistas más escuchados'}
            description={'N artistas con las mayores reproducciones'}
            redirect={() => setModal1Show(true)}
            click={false}
          />
          <ModalArtist
            show={modal1Show}
            onHide={() => setModal1Show(false)}
          />
          <ReportItem
            image={activeUsers}
            title={'Géneros más escuchados'}
            description={'Total de reproducciones por género'}
            redirect={() => setModal2Show(true)}
            click={false}
          />
          <RangeDate
            show={modal2Show}
            onHide={() => setModal2Show(false)}
          />
          <ReportItem
            image={activeUsers}
            title={'Canciones más escuchadas'}
            description={'Canciones más escuchadas '}
            redirect={() => setModal3Show(true)}
            click={false}
          />
          <ModalSongsArtists
            show={modal3Show}
            onHide={() => setModal3Show(false)}
          />
        </div>
      </div>
      {/* Presentación de reportes */}
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
                <Route  path={`${path}/report`} />
              </Switch>
            </div>
          </section>
    </div>
  );
}

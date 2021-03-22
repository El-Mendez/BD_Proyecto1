import React from 'react';
import ReportItem from './reportItem'
import ArtistReport from './artistReport/artistReport'
import UsersReport from "./userReport/usersReport";
import GenresReport from "./genresReport/genresReport";
import AlbumsReport from "./albumsReport/albumsReport";

export default class report extends React.Component{
    render() {
        return (
            <div className={'container-fluid mt-5'}>
                <h1 className={'text-secondary'}>Reporte</h1>
                {/*<div className={'d-flex flex-wrap justify-content-around'}>*/}
                {/*    <ReportItem*/}
                {/*        title={'Álbumes'}*/}
                {/*        description={'Álbumes recientes de la semana'}/>*/}
                {/*    <ReportItem*/}
                {/*        title={'Artistas'}*/}
                {/*        description={'Artistas con popularidad creciente en los últimos 3 meses'}/>*/}
                {/*    <ReportItem*/}
                {/*        title={'Artistas'}*/}
                {/*        description={'Artistas con mayor producción musical'}/>*/}
                {/*    <ReportItem*/}
                {/*        title={'Géneros'}*/}
                {/*        description={'Géneros más populares'}/>*/}
                {/*    <ReportItem*/}
                {/*        title={'Suscripciones'}*/}
                {/*        description={'Nuevas suscripciones en los últimos seis meses'}/>*/}
                {/*    <ReportItem*/}
                {/*        title={'Usuarios'}*/}
                {/*        description={'Usuarios más activos'}/>*/}
                {/*</div>*/}
                {/*<ArtistReport/>*/}
                {/*<UsersReport/>*/}
                {/*<GenresReport/>*/}
                <AlbumsReport/>
            </div>

        );
    }
}

import React from 'react';
import GenreItemreport from "./genreItemreport";

export default class genresReport extends React.Component{
    render() {
        return(
            <div className={'container-fluid d-flex flex-wrap justify-content-around'}>
               <GenreItemreport/>
               <GenreItemreport/>
            </div>
        );
    }
}
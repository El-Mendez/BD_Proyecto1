import React from 'react';
import AlbumItemreport from "./albumItemreport";

export default class albumsReport extends React.Component{
    render() {
        return (
            <div className={'container d-flex flex-wrap justify-content-around'}>
                <AlbumItemreport/>
                <AlbumItemreport/>
            </div>
        );
    }
}
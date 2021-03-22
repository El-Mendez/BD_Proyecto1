import React from 'react';
import test from '../../utils/badLiar.jpg'
export default class albumItemreport extends React.Component{
    render() {
        return (
            <div className="card album-card m-0">
                <img src={test} alt="TEST"/>
                    <div className="card-body bg-secondary p-2">
                        <h5 className="card-title m-0">AlbumName</h5>
                        <p className="card-text m-0">ArtistName</p>
                        <p className="card-text m-0">Date</p>
                    </div>
            </div>
        );
    }
}
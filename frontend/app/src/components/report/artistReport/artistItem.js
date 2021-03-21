import React from 'react';

import test from '../../utils/badLiar.jpg'

export default class artistItem extends React.Component {
    render() {
        return(
            <div className={'thumbnail-col'}>
                <img src={test} className={'rounded-circle thumbnail'}/>
                <h1 className={'text-center'}>ArtistName</h1>
            </div>
        );
    }
}
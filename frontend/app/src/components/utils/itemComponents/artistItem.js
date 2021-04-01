import React from 'react';

import test from '../../../assets/badLiar.jpg'

export default class artistItem extends React.Component {
    render() {
        return(
            <div className={'thumbnail-col'}>
                <img src={test} className={'rounded-circle thumbnail-artist'}/>
                <h6 className={'text-center text-secondary'}>{this.props.userName}</h6>
            </div>
        );
    }
}

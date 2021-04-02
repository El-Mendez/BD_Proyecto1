import React from 'react';

export default class genreItem extends React.Component{
    render() {
        return(
            <div className="card genre-card genre-bg">
                <div className="card-body d-flex justify-content-center">
                    <h1 className={'align-self-center'}>{this.props.genre}</h1>
                </div>
            </div>
        );
    }
}

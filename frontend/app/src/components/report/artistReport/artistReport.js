import React from 'react';
import ArtistItem from "./artistItem";

export default class artistReport extends React.Component{
    render() {
        return(
            <div className={'d-flex flex-wrap'}>
               <ArtistItem
               userName = {'Bruno Mars'}/>
            </div>
        );
    }
}
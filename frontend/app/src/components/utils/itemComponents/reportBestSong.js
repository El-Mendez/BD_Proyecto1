import React from 'react';

export default function ReportBestSong (props){
    return(
      <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
        <div className={'ms-2'}>
          <h5 className={'text-secondary mb-auto'}> Cancion:  {props.result.artista}</h5>
          <h5> Reproducciones:  {props.result.reproducciones}</h5>
        </div>
      </div>
    );
}

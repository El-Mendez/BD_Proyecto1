import React from 'react';

export default function NewReportsItem (props){
    return(
      <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
        <div className={'ms-2'}>
          <h5 className={'text-secondary mb-auto'}> Artista:  {props.streams}</h5>
          <h5> Reproducciones:  {props.quantity}</h5>
        </div>
      </div>
    );
}

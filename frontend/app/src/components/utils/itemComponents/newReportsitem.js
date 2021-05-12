import React from 'react';

export default function NewReportsItem (props){
    return(
      <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
        <div className={'ms-2'}>
          <h5 className={'text-secondary mb-auto'}> Desde:  {props.start} hasta: {props.end}</h5>
        </div>
        <p className={'text-secondary-light ms-4'}> → reproducciones:  {props.streams}</p>
      </div>
    );
}

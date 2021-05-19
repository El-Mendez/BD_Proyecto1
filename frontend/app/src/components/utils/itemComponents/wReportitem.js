import React from 'react';

export default function WReportItem (props){
  return(
    <div className={'d-flex my-4 border-bottom text-secondary pb-2 align-items-center'}>
      <div className={'ms-2'}>
        <h5 className={'text-secondary mb-auto'}> Desde:  {props.start}</h5>
        <h5> Hasta:  {props.end}</h5>
      </div>
      <h6 className={'ms-5'}> →  reproducciones:  {props.streams}</h6>
    </div>
  );
}

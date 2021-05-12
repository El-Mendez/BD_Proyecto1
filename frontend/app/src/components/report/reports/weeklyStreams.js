import React from 'react';
import NewReportsItem from '../../utils/itemComponents/newReportsitem';
import RangeDate from './rangeDate';

export default function WeeklyStreams(props){

  const [modalShow, setModalShow] = React.useState(false);

  const [wStreams, setWStreams] = React.useState({
    date: '',
    streams: 0,
  });

  const updateData = (data, stream) =>{
    console.log('entras?')
    setWStreams({
      date: data,
      streams: stream,
    })
    console.log(wStreams.date);
    console.log(wStreams.streams);
  };

  return(
    <section className={'section-container'}>
      <div className="section-title text-secondary">
        <h2 className="title">
          Reproducciones por semana
        </h2>
        <button className={"border-btn mb-2"} onClick={() => setModalShow(true)}>Ingresar fecha</button>
        <RangeDate
          show={modalShow}
          onHide={() => setModalShow(false)}
          updateData = {(data, stream) => updateData(data, stream)}
        />
      </div>
        <NewReportsItem
        date={wStreams.date}
        streams={wStreams.streams}
        />
    </section>
  );
}

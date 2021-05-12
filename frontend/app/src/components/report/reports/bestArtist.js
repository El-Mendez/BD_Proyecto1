import React from 'react';
import NewReportsItem from '../../utils/itemComponents/newReportsitem';
import RangeDate from './modalArtist';

export default function WeeklyStreams(){

  const [modalShow, setModalShow] = React.useState(false);

  const [wStreams, setWStreams] = React.useState({
    start: '',
    end: '',
    streams: 0,
  });

  const updateData = (start, end, stream) =>{
    setWStreams({
      start: start,
      end: end,
      streams: stream,
    })
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
          updateData = {(start, end, stream) => updateData(start, end, stream)}
        />
      </div>
        <NewReportsItem
        start={wStreams.start}
        end={wStreams.end}
        streams={wStreams.streams}
        />
    </section>
  );
}

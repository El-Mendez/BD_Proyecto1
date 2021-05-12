import React, {useState} from 'react';
import WeeklyReportItem from '../../utils/itemComponents/reportBestSong';
import RangeDate from './songArtistModal';

export default function BestSongs(){

  const [modalShow, setModalShow] = React.useState(false);
  const [result, setResult] = useState([])

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
          Canciones más escuchadas de un artista
        </h2>
        <button className={"border-btn-reports mb-2"} onClick={() => setModalShow(true)}>Ingresar fecha</button>
        <RangeDate
          show={modalShow}
          onHide={() => setModalShow(false)}
          updateData = {(start, end, stream) => updateData(start, end, stream)}
          setResult = {(result) => setResult(result)}
        />
      </div>
      {
        result.map((user) => {
        result.indexOf(user)
        return (
            <WeeklyReportItem
            result={user}
            />
      );
    })
  }
    </section>
  );
}

import React from 'react';
import GenreStreamItem from '../../utils/itemComponents/genreStreamItem';
import BetweenDates from './betweenDates';

export default function GenreStreams(){

  const [modalShow, setModalShow] = React.useState(false);

  const [wStreams, setWStreams] = React.useState([]);
  const [date, setDate] = React.useState({
    start: '',
    end: '',
  })

  const updateData = (start, end, data) =>{
    console.log('wtf');
    setDate({
      start: start,
      end: end,
    })
    setWStreams(data);
  };

  return(
    <section className={'section-container'}>
      <div className="section-title text-secondary">
        <h2 className="title">
          Reproducciones por género en un rango de fechas dado
        </h2>
        <button className={"border-btn-reports mb-2"} onClick={() => setModalShow(true)}>Ingresar fecha</button>
        <BetweenDates
          show={modalShow}
          onHide={() => setModalShow(false)}
          updateData = {(start, end, data) => updateData(data)}
        />
      </div>
      {
        wStreams.map((item)=> {
          return(
            <GenreStreamItem
              start={date.start}
              end={date.end}
              genre={item.genero}
              streams={item.reproducciones}
            />
          );
        })
      }
    </section>
  );
}

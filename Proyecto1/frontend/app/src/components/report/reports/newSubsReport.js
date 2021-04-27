import React, { useState } from 'react';
import NewSubs from "../../utils/itemComponents/activeItem";
import reportRequest from '../../utils/reportsRequest';

//Missing month from the request and the last 6 months, only returns 1 month

export default function newSubsReport() {

  const get = 'http://3.135.234.254:3000/reports/newSubscriptions';
  const [newSubs, setNewSubs] = useState([]);

  //Request to the api for the most popular genres
  reportRequest(get, setNewSubs);

    return (
      <section className={'section-container'}>
        <div id="discography" className="section-title text-secondary">
          <h2 className="title">
            Nuevos suscriptores en los últimos 6 meses
          </h2>
        </div>
        <div id="albums" className="d-flex flex-wrap justify-content-between">
          {
            newSubs.map((sub) => {
              const index = newSubs.indexOf(sub)
              return (
                <NewSubs
                  key={index}
                  month={sub.mes}
                  quantity={sub.count}
                />
              );
            })
          }
        </div>
      </section>
    );
}

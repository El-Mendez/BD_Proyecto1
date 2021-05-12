import React, { useState } from 'react';
import UserItemreport from "../../utils/itemComponents/userItemreport";
import reportRequest from '../../utils/reportsRequest';

export default function usersReport() {
  const get = 'http://3.135.234.254:3000/reports/topActiveUsers';
  const [activeUsers, setActiveUsers] = useState([]);

  //Request to the api for the most popular genres
  reportRequest(get, setActiveUsers);

  return(
<section className={'section-container'}>
<div id="artists" className="section-title text-secondary">
  <h2 className="title">
    10 usuarios más activos en el último mes
  </h2>
</div>
<div id="activeUsers">
  {
    activeUsers.map((user) => {
      const index = activeUsers.indexOf(user)
      return (
        <UserItemreport
          key={index}
          username={user.username}
          type={user.reproducciones}
        />
      );
    })
  }
</div>
</section>
);
}

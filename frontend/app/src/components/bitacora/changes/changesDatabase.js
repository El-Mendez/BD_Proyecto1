import React, {useState, useEffect} from 'react';
import Changes from "../../utils/itemComponents/changesComponent";
import Axios from 'axios';
import reportRequest from '../../utils/reportsRequest';

export default function changesDatabase(props) {
  const get =  props.request;
  const [data, setData] = useState([])

  //Request to the api for the most popular genres
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await Axios.get(get)
        setData(response.data[0]);
        console.log(data.username)
      }catch (e){
        console.log(e)
      }
    };
    fetchData();
  },[setData])

  return(
<section className={'section-container'}>
<div id="artists" className="section-title text-secondary">
  <h2 className="title">
    Cambios en {props.title}
  </h2>
</div>
<div id="activeUsers">
  {
    data.map((user) => {
      data.indexOf(user)
      return (
        <Changes
          fecha={user.fecha}
          username={user.username}
          operacion={user.operacion}
          elemento={user.elemento}
        />
      );
    })
  }
</div>
</section>
);
}

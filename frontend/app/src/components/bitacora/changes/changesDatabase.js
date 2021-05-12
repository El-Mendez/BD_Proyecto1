import React, {useState, useEffect} from 'react';
import Changes from "../../utils/itemComponents/changesComponent";
import Axios from 'axios';

export default function changesDatabase(props) {
  const get =  props.request;
  const [data, setData] = useState([])

  //Request to the api for the most popular genres
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await Axios.get(get)
        setData(response.data);
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
  <div className={"row-title"}>
    <div className={"row-title-record mt-2 pSong-grid"}>
      <div className={"pR_title justify-self-star"}>
        <h5>Modificador</h5>
      </div>
      <div className={"pR_title justify-self-star"}>
        <h5>Operación</h5>
      </div>
      <div className={"pR_title justify-self-star"}>
        <h5>Registro afectado</h5>
      </div>
      <div className={"pR_title justify-self-start"}>
        <h5>Fecha</h5>
      </div>
    </div>
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

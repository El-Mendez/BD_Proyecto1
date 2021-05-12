import React, {Fragment, useState, useEffect} from 'react';
import Axios from 'axios';
import { useRouteMatch } from "react-router-dom";

export default function artistProfit (props) {
  const get_user = 'http://3.135.234.254:3000/revenueArtist'
    const [data, setData] = useState([])
    const userId = useRouteMatch ('/user/:id')
    useEffect(() => {
        const fetchData = async () => {
          try{
            const response = await Axios.post(get_user, {
                nombre: userId.params.id
            })
            setData(response.data[0]);
          }catch (e){
            console.log(e)
          }
        };
        fetchData();
      },[setData])

    return (
        <div className="col info_Usuario"> 
            <div className="asd">
                <div className="row titulo">
                  <h5>
                    Los esfuerzos de hoy son las ganancias de mañana...
                  </h5>
                </div>
                <div className="row textoProfit">
                  <h5>
                    {data.nombre}
                  </h5>
                </div>
                <div className="row textoProfit">
                  <h6>
                    Ingresos por reproducción: 0.15$
                  </h6>
                </div>
                <div className="row textoProfit">
                  <h6>
                    Total de reproducciones: {data.revenue/0.15}
                  </h6>
                </div>
                <div className="row textoProfit">
                  <h6>
                    Comisión total = {data.revenue} $
                  </h6>
                </div>
            </div>
        </div>
        )
    
}


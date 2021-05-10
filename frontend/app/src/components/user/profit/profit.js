import React, {Fragment, useState, useEffect} from 'react';

export default function artistProfit (props) {
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
                    {props.username}
                  </h5>
                </div>
                <div className="row textoProfit">
                  <h7>
                    Ingresos por reproducción: 0.15$
                  </h7>
                </div>
                <div className="row textoProfit">
                  <h7>
                    Total de reproducciones: pez
                  </h7>
                </div>
                <div className="row textoProfit">
                  <h7>
                    Comisión total = pez^2
                  </h7>
                </div>
            </div>
        </div>
        )
    
}


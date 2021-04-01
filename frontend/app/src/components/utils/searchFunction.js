import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function searchFunction(api, search, container, parametro) {

    console.log("Loading...");
    const fetchData = async (parametro) => {
      try {
        const { data } = await Axios.post(api,
          {
            param: param + '%'
          }
        );
        container = data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(search);

}

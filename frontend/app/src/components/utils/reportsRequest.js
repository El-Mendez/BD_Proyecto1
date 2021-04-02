import { useEffect } from 'react';
import Axios from 'axios';

export default function reportRequest(api, container){
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await Axios.get(api);
        console.log(response.data);
        container(response.data);
      }catch (e){
        console.log(e)
      }
    };
    fetchData();
  },[container])
}

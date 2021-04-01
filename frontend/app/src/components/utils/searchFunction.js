import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function searchFunction(search) {

  const get_song = 'http://3.135.234.254:3000/getSpecificSong'
  const get_songs = 'http://3.135.234.254:3000/songs/';

  var lSongs = [];

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await Axios.get(get_songs);
        lSongs = response.data
      }catch (e){
        setError(e);
        console.log(e)
      }
    };
    fetchData();
  },[lSongs])

  return lSongs;
}

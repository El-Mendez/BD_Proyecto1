import  React, {useState, useEffect} from 'react';
import SongItem from './songItem';
import Axios from 'axios';

export default function genderSongs(props){

    const songProps = props;

    const get_song = 'http://3.135.234.254:3000/songs/';
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await Axios.get(get_song);
                setItems(response.data);
            }catch (e){
                setError(e);
                console.log(e)
            }
        };
        fetchData();
    },[setItems])


    return (
      <div>
          <div className={'ml-3 d-flex flex-wrap'}>
              {
                  items.map((item) => {
                      return <SongItem
                        key={item.id_cancion}
                        s_name = {item.cancion_nombre}
                        a_name = {item.artista_nombre}
                        songPlaying = {() => songProps.songPlaying(item)}
                      />
                  })
              }
          </div>
      </div>

    );
}



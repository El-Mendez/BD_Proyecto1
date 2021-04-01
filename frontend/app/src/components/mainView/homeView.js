import  React, {useState, useEffect} from 'react';
import SongItem from '../utils/itemComponents/songItemcard';
import Axios from 'axios';
import HomeBar from '../menuBar/homeBar'

export default function HomeView(props){
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


  return(
    <div className={'view-container'}>
      <div id={'topBar-space'}>
       <HomeBar/>
      </div>
      <section>
        <div className={'home-container'}>
          <section className={'section-container'}>
            <div id="songs-genre">
              Música general
            </div>
            <div id="songs" className="songs-container">
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
          </section>
        </div>
      </section>
    </div>
  );
}

import  React, {useState, useEffect} from 'react';
import SongItem from '../utils/itemComponents/songItemcard';
import { useParams } from'react-router-dom';
import Axios from 'axios';
import HomeBar from '../menuBar/homeBar'

export default function HomeView(props){
  const songProps = props;

  const get_song = 'http://3.135.234.254:3000/songs/';
  const [items, setItems] = useState([]);

  let { user } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await Axios.get(get_song);
        setItems(response.data);
      }catch (e){
        console.log(e)
      }
    };
    fetchData();
  },[setItems])


  return(
    <div className={'view-container'}>
      <div id={'topBar-space'}>
       <HomeBar
       user_name={user}/>
      </div>
      <section>
        <div className={'home-container'}>
          <section className={'section-container'}>
            <div id="songs-genre">
              <h4 className={"text-secondary"}> ◆ Zoa Music ◆ </h4>
            </div>
            <div id="songs" className="songs-container">
              {
                items.map((item) => {
                  return (
                    item.estado? <SongItem
                    key={item.id_cancion}
                    s_name = {item.cancion_nombre}
                    s_link = {item.link}
                    a_name = {item.artista_nombre}
                    songPlaying = {() => songProps.songPlaying(item)}
                  /> : ''
                  );
                })
              }
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

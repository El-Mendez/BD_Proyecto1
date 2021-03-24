import  React, {useState, useEffect} from 'react';
import SongItem from './songItem';

export default function genderSongs(){

    const get_song = 'http://3.135.234.254:3000/songs/';
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(get_song)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className={'ml-3 d-flex flex-wrap'}>
                {
                    items.map((item) => {
                        return <SongItem
                            key={item.id_cancion}
                            s_name = {item.nombre}
                            a_name = {item.id_artista}
                        />
                    })
                }
            </div>
        );
    }

}
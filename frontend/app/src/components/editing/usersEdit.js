import React from 'react';
import Axios from 'axios';
import { BsSearch as I_search, BsThreeDotsVertical as I_menu
} from 'react-icons/bs';
import EditUserItem from './items/editUseritem';


export default function UsersEdit(){
  const get_song = 'http://3.135.234.254:3000/getSpecificSong';

  const [search, setSearch] = React.useState('');
  const [users, setUsers] = React.useState([]);


  //Search users
  function getUsers(){
    const fetchData = async () => {
      try {
        const { data } = await Axios.post(get_song,
          {
            nombre: search + '%'
          }
        );
        console.log(data)
        setUsers(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };


  const handleInputChange = (e) =>{
    setSearch(e.target.value);
  }
  const onClick = () =>{
    if(search !== ''){
      getUsers();
    }else{
      alert('Ingrese el nombre de la canción para buscar')
    }
  }

  return(
    <section className={'overflow-auto'}>
      {/* SEARCH SONG FOR THE PLAYLIST */}
      <section className={"search-songs"}>
        <div className={"d-inline-block"}>
          <h5 className={'text-secondary mb-3'}>Busca el usuario a editar</h5>
          <div className={"d-flex search-container"}>
            <div className={"d-flex"} style={{background: '#ffffff1a'}}>
              <span className={"mx-2 text-secondary"}><I_search/></span>
              <input className={"sP-search"}
                     type={"text"}
                     maxLength={"80"}
                     name={'search'}
                     placeholder={"Nombre de la canción"}
                     onChange={handleInputChange}/>
            </div>
            <button className={'btn upgrade-btn ml-4'} onClick={onClick}>
              BUSCAR
            </button>
          </div>
        </div>
        {/* CANCIONES ENCONTRADAS */}
        <section className={'my-4'}>
          <div id="songs">
            {
              users.map((user) => {
                  const index = users.indexOf(user)
                  return(
                    user.estado?
                      <EditUserItem
                        key={index}
                        index={index + 1}
                        title={user.nombre}
                        info={user.username}
                        usertype={user.tipo}
                        icon={<I_menu/>}
                        header_el={"Eliminación de suscripción"}
                        details_el={"¿Estas seguro que deseas eliminar la suscripción?"}
                        header_des={"Desactivación de usuario"}
                        details_des={"¿Estas seguro que deseas desactivar al usuario?"}
                      /> : ''
                  );
                }
              )
            }
          </div>
        </section>
        <EditUserItem
          key={1}
          index={1}
          title={'Algo'}
          info={'usuario'}
          icon={<I_menu/>}
          header_el={"Eliminación de suscripción"}
          details_el={"¿Estas seguro que deseas eliminar la suscripción?"}
          header_des={"Desactivación de usuario"}
          details_des={"¿Estas seguro que deseas desactivar al usuario?"}
        />
      </section>
    </section>
  );
}

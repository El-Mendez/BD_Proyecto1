import Axios from 'axios';

// REQUEST WITH NOMBRE AS PARAMETER

function getRequestnombre(api, search, container){
  const fetchData = async () => {
    try {
      const { data } = await Axios.post(api,
        {
          nombre: search
        }
      );
      container(data)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
};

// api/authService.js
import axios from 'axios';
import { apiURL } from './apiGlobal';

//import { useAPI } from '../context/APIContext';


export const login = async (username, password) => {
  // utilización del contexto api aquí dentro
  //const { apiIP, setApiIP } = useAPI();
  
  const _apiURL = `${apiURL}/loginExample/login.php`; //junto variable global con endPoint

  try {
    const response = await axios.post(_apiURL, {
      username, // En Axios, simplemente puedes pasar el objeto con los datos
      password,
    });

    const { token, email, nn, idCl } = response.data;

    return { token, email, nn, idCl };
  } catch (error) {
    
    throw new Error(error.response?.data?.message || 'Login fallido');
  }
};

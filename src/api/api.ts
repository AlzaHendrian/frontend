import axios from 'axios';


export const API = axios.create({
  baseURL: process.env.REACT_APP_API_LOCAL,
})


export const setAuthToken = (token: string) => {
  console.log(token, "<<< token in api")
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
    }
  };
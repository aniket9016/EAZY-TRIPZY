import API from './axios';

export const getLocations = () => API.get('/Location/GetAllLocation'); 

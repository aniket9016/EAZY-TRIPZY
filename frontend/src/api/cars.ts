import API from './axios';

export const getCars = () => API.get('/Car/GetAllCar');

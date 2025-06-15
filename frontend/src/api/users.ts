import API from './axios';

export const getUsers = () => API.get('/User/GetAllUser'); 

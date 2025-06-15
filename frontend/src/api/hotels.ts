import API from './axios';

export const getHotels = () => API.get('/Hotel/GetAllHotel');

export const getHotelById = (id: string) =>
  API.get(`/Hotel/GetHotelByID?id=${id}`);

export const addHotel = (formData: FormData) =>
  API.post('/Hotel/AddHotel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateHotel = (formData: FormData) =>
  API.patch('/Hotel/EditHotel', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteHotel = (id: string) =>
  API.delete(`/Hotel/RemoveHotel?id=${id}`);

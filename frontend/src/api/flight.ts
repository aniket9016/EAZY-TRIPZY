import API from './axios';

export const getFlights = () => API.get('/Flight/GetAllFlight');

export const addFlight = (formData: FormData) =>
  API.post('/Flight/AddFlight', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateFlight = (formData: FormData) =>
  API.put('/Flight/EditFlight', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteFlight = (id: string) =>
  API.delete(`/Flight/RemoveFlight?id=${id}`);

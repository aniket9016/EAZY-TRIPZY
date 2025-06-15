import API from './axios';

export const getCarBookings = () => API.get('/CarBooking/GetAllCarBooking');
export const addCarBooking = (data: any) => API.post('/CarBooking/AddCarBooking', data);
export const editCarBooking = (id: string, data: any) => API.put(`/CarBooking/EditCarBooking/${id}`, data);
export const deleteCarBooking = (id: string) => API.delete(`/CarBooking/RemoveCarBooking/${id}`);

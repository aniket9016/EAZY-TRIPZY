import API from './axios';

export const getLocations = () => API.get('/Location/GetAllLocation');

export const getLocationById = (id: string) =>
  API.get(`/Location/GetLocationByID`, {
    params: { id },
  });

export const addLocation = (locationData: any) =>
  API.post('/Location/AddLocation', locationData);

export const updateLocation = (id: string, locationData: any) =>
  API.patch(`/Location/EditLocation/${id}`, { ...locationData, id });

export const deleteLocation = (id: string) =>
  API.delete(`/Location/RemoveLocation/${id}`);

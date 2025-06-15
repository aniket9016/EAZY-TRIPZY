import axios from "axios";

const BASE_URL = "https://localhost:7032/api/Restaurant";

export const getRestaurants = () => axios.get(`${BASE_URL}/GetAllRestaurant`);

export const getRestaurantById = (id: string) =>
  axios.get(`${BASE_URL}/GetRestaurantByID`, {
    params: { id },
  });

export const addRestaurant = (formData: FormData) =>
  axios.post(`${BASE_URL}/AddRestaurant`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateRestaurant = (formData: FormData) =>
  axios.patch(`${BASE_URL}/EditRestaurant/${formData.get("ID")}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteRestaurant = (id: string) =>
  axios.delete(`${BASE_URL}/RemoveRestaurant/${id}`);

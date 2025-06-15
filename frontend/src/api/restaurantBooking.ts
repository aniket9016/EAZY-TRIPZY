import axios from "axios";

const BASE_URL = "https://localhost:7032/api/RestaurantBooking";

// GET all restaurant bookings
export const getRestaurantBookings = () => {
  return axios.get(`${BASE_URL}/GetAllRestaurantBooking`);
};

// GET a booking by ID
export const getRestaurantBookingById = (id: string) => {
  return axios.get(`${BASE_URL}/GetRestaurantBookingByID`, {
    params: { id },
  });
};

// ADD a booking (JSON payload)
export const addRestaurantBooking = (data: {
  restaurantID: string;
  userID: string;
  mealTime: string;
  totalPeople: string;
  bookingDate: string;
  mealDate: string;
  status: string;
}) => {
  return axios.post(`${BASE_URL}/AddRestaurantBooking`, data);
};

// EDIT a booking by ID (JSON payload)
export const editRestaurantBooking = (id: string, data: {
  restaurantID: string;
  userID: string;
  mealTime: string;
  totalPeople: string;
  bookingDate: string;
  mealDate: string;
  status: string;
}) => {
  return axios.patch(`${BASE_URL}/EditRestaurantBooking/${id}`, data);
};

// DELETE a booking by ID
export const deleteRestaurantBooking = (id: string) => {
  return axios.delete(`${BASE_URL}/RemoveRestaurantBooking/${id}`);
};

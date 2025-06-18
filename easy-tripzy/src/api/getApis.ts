import API from "./axios";

//car
export const getCars = () => API.get("/Car/GetAllCar");
export const getCarById = (id: string) => API.get("/Car/GetCarByID", {
  params: { id },
});
export const getCarBookings = () => API.get("/CarBooking/GetAllCarBooking");
export const addCarBooking = (data: any) => API.post('/CarBooking/AddCarBooking', data);
export const deleteCarBooking = (id: string) => API.delete(`/CarBooking/RemoveCarBooking/${id}`);

//flight
export const getFlights = () => API.get("/Flight/GetAllFlight");

//hotel
export const getHotelBookings = () => {
  return API.get("/HotelBooking/GetAllHotelBooking");
};
export const getHotels = () => API.get("/Hotel/GetAllHotel");

//location
export const getLocations = () => API.get("/Location/GetAllLocation");

//restaurant
export const getRestaurants = () => API.get("/Restaurant/GetAllRestaurant");
export const getRestaurantById = (id: string) => {
  return API.get("/Restaurant/GetRestaurantByID", {
    params: { id },
  });
};
export const getRestaurantBookings = () => {
  return API.get("/RestaurantBooking/GetAllRestaurantBooking");
};
export const getRestaurantBookingById = (id: string) => {
  return API.get(`/RestaurantBooking/GetRestaurantBookingByID`, {
    params: { id },
  });
};
export const addRestaurantBooking = (data: {
  restaurantID: string;
  userID: string;
  mealTime: string;
  totalPeople: string;
  bookingDate: string;
  mealDate: string;
  status: string;
}) => {
  return API.post(`/RestaurantBooking/AddRestaurantBooking`, data);
};
export const deleteRestaurantBooking = (id: string) => {
  return API.delete(`/RestaurantBooking/RemoveRestaurantBooking/${id}`);
};


//user
export const getUsers = () => API.get("/User/GetAllUser");
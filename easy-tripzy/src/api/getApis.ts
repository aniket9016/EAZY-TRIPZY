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
export const getFlightBookings = () => {
  return API.get('/FlightBooking/GetAllFlightBooking');
};

export const getFlightBookingById = (id: string) => {
  return API.get('/FlightBooking/GetFlightBookingByID', {
    params: { id },
  });
};

export const addFlightBooking = (data: {
  userID: string;
  flightID: string;
  bookingDate: string; 
  adults: string;
  kids: string;
  price: number;
}) => {
  return API.post('/FlightBooking/AddFlightBooking', data);
};

export const editFlightBooking = (
  id: string,
  data: {
    userID: string;
    flightID: string;
    bookingDate: string;
    adults: string;
    kids: string;
    price: number;
  }
) => {
  const payload = {
    ...data,
    flightBookingID: id, 
  };
  return API.patch(`/FlightBooking/EditFlightBooking/${id}`, payload);
};

export const deleteFlightBooking = (id: string) => {
  return API.delete(`/FlightBooking/RemoveFlightBooking/${id}`);
};


//hotel
export const getHotelBookings = () => {
  return API.get("/HotelBooking/GetAllHotelBooking");
};
export const getHotels = () => API.get("/Hotel/GetAllHotel");
export const getHotelById = (id: string) => {
  return API.get('/Hotel/GetHotelByID', {
    params: { id },
  });
};

export const getHotelBookingById = (id: string) => {
  return API.get('/HotelBooking/GetHotelBookingByID', {
    params: { id },
  });
};

export const addHotelBooking = (data: {
  userID: string;
  hotelID: string;
  bookingDate: string;
  checkindate: string;
  checkoutdate: string;
  price: string;
  bookingStatus: string;
  noofPeople: string;
  roomType: string;
}) => {
  return API.post('/HotelBooking/AddHotelBooking', data);
};

export const deleteHotelBooking = (id: string) => {
  return API.delete(`/HotelBooking/RemoveHotelBooking/${id}`);
};


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
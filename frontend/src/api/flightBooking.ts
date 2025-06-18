import API from './axios';

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

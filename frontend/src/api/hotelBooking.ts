import API from './axios';

export const getHotelBookings = () => {
  return API.get('/HotelBooking/GetAllHotelBooking');
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

export const editHotelBooking = (
  id: string,
  data: {
    userID: string;
    hotelID: string;
    bookingDate: string;
    checkindate: string;
    checkoutdate: string;
    price: string;
    bookingStatus: string;
    noofPeople: string;
    roomType: string;
  }
) => {
  const payload = {
    ...data,
    hotelBookingId: id,
  };
  return API.patch(`/HotelBooking/EditHotelBooking/${id}`, payload);
};

export const deleteHotelBooking = (id: string) => {
  return API.delete(`/HotelBooking/RemoveHotelBooking/${id}`);
};

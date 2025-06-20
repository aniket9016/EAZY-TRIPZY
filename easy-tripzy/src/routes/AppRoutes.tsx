import { Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Restaurants from "../pages/Restaurants/Restaurants";
import RestaurantDetail from "../pages/Restaurants/RestaurantDetail";
import MyBookings from "../pages/MyBookings";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound"; 
import Hotels from "../pages/Hotels/Hotels";
import HotelDetail from "../pages/Hotels/HotelDetail";
import Flights from "../pages/Flights/Flights";
import Cars from "../pages/Cars/Cars";
import CarDetail from "../pages/Cars/CarDetail";
import FlightDetail from "../pages/Flights/FlightDetail";
const AppRoutes = (
  <>
    <Route path="/" element={<Landing />} />

    <Route element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant-detail" element={<RestaurantDetail />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotel-detail" element={<HotelDetail />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-detail" element={<CarDetail />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flight-detail" element={<FlightDetail />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </>
);

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Login from "../pages/Users/Login";
import Register from "../pages/Users/Register";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users/Users";
import Cars from "../pages/Cars/Cars";
import CarBookings from "../pages/Cars/CarBookings";
import Flights from "../pages/Flights/Flights";
import Hotels from "../pages/Hotels/Hotels"; 
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/carbookings" element={<CarBookings />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} /> {/* ✅ Added */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

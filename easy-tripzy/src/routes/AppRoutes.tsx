import { Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Restaurants from "../pages/Restaurants/Restaurants";
import RestaurantDetail from "../pages/Restaurants/RestaurantDetail";

const AppRoutes = (
  <>
    {/* No navbar on landing */}
    <Route path="/" element={<Landing />} />

    {/* Layout wraps all other routes */}
    <Route element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant-detail" element={<RestaurantDetail />} />
      {/* Add more routes here */}
    </Route>
  </>
);

export default AppRoutes;

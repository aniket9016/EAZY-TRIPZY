import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LogoutIcon from "@mui/icons-material/Logout";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const drawerWidth = 240;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#2c2c2c",
        color: "#fff",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "#444" }} />
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/users")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/cars")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <DirectionsCarIcon />
          </ListItemIcon>
          <ListItemText primary="Cars" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/flights")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <FlightTakeoffIcon />
          </ListItemIcon>
          <ListItemText primary="Flights" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/hotels")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <HotelIcon />
          </ListItemIcon>
          <ListItemText primary="Hotels" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/restaurants")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Restaurants" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/carbookings")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <BookOnlineIcon />
          </ListItemIcon>
          <ListItemText primary="Car Bookings" />
        </ListItemButton>

        {/* ✅ Added Restaurant Bookings navigation */}
        <ListItemButton onClick={() => navigate("/restaurantbookings")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <BookOnlineIcon />
          </ListItemIcon>
          <ListItemText primary="Restaurant Bookings" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          backgroundColor: "#2c2c2c",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Travel Planner Admin
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#2c2c2c",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#2c2c2c",
              color: "#fff",
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import tripIcon from "../../public/appicon.svg";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import { toast } from "react-toastify";

const navItems = [
  { text: "Hotels", path: "/hotels", icon: <HotelIcon /> },
  { text: "Flights", path: "/flights", icon: <FlightTakeoffIcon /> },
  { text: "Restaurants", path: "/restaurants", icon: <RestaurantIcon /> },
  { text: "Cars", path: "/cars", icon: <DirectionsCarIcon /> },
];

export default function Navbar() {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const isFirstLogin = sessionStorage.getItem("firstLogin");

    if (token && !isFirstLogin) {
      setShowLogin(false);
      setShowSignup(false);
      toast.success("Logged in successfully");
      sessionStorage.setItem("firstLogin", "true");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("firstLogin");
    toast.info("Logged out successfully");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleBookings = () => {
    navigate("/my-bookings");
    handleProfileClose();
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={toggleDrawer}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        {!token ? (
          <>
            <ListItemButton
              onClick={() => {
                setShowLogin(true);
                toggleDrawer();
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                setShowSignup(true);
                toggleDrawer();
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              onClick={() => {
                navigate("/my-bookings");
                toggleDrawer();
              }}
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="My Bookings" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleLogout();
                toggleDrawer();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component={Link}
            to="/home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Avatar
              src={tripIcon}
              alt="Easy Tripzy"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: 1,
              }}
            >
              Easy Tripzy
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}

              {!token ? (
                <>
                  <Button
                    color="inherit"
                    startIcon={<LoginIcon />}
                    onClick={() => setShowLogin(true)}
                  >
                    Log In
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setShowSignup(true)}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <IconButton color="inherit" onClick={handleProfileClick}>
                    <PersonIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={handleBookings}>
                      <EventNoteIcon sx={{ mr: 1 }} fontSize="small" />
                      My Bookings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        openLogin={() => setShowLogin(true)}
      />
    </>
  );
}

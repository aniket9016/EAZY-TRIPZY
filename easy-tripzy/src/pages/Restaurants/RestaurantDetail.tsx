// src/pages/Restaurants/RestaurantDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRestaurants, addRestaurantBooking } from "../../api/getApis";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";

interface Restaurant {
  id: string;
  name: string;
  desc: string;
  address: string;
  phoneNumber: string;
  country: string;
  city: string;
  meals: string;
  image: string;
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [booking, setBooking] = useState({
    mealDate: "",
    mealTime: "Lunch",
    totalPeople: "1",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRestaurants();
        const restaurants = res.data as Restaurant[];
        const match = restaurants.find((r) => r.id === id);
        if (match) setRestaurant(match);
        else navigate("/restaurants");
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
        toast.error("Failed to load restaurant data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleBooking = () => {
    if (!token || !userID) {
      toast.warn("Please login or sign up to book the restaurant.");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmBooking = async () => {
    try {
      await addRestaurantBooking({
        restaurantID: restaurant?.id ?? "",
        userID: userID ?? "",
        mealTime: booking.mealTime,
        totalPeople: booking.totalPeople,
        bookingDate: new Date().toISOString(),
        mealDate: booking.mealDate,
        status: "Pending",
      });
      toast.success("Booking confirmed!");
      setConfirmDialog(false);
    } catch (error) {
      console.error("Booking error", error);
      toast.error("Booking failed. Try again.");
    }
  };

  if (loading || !restaurant) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <RestaurantIcon color="primary" />
        <Typography variant="h4">{restaurant.name}</Typography>
      </Box>

      <img
        src={`https://localhost:7032/Images/Restaurant/${restaurant.image}`}
        alt={restaurant.name}
        style={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/no-image.png";
        }}
      />

      <Paper sx={{ mt: 3, p: 2, boxShadow: 4 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <DescriptionIcon color="primary" />
          <Typography>{restaurant.desc}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon color="secondary" />
          <Typography>
            {restaurant.address}, {restaurant.city}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <PublicIcon />
          <Typography>{restaurant.country}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <PhoneIcon />
          <Typography>{restaurant.phoneNumber}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <RestaurantIcon />
          <Typography>{restaurant.meals}</Typography>
        </Box>
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button
          variant="contained"
          onClick={handleBooking}
          sx={{ flexGrow: 1 }}
        >
          Book Restaurant
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/restaurants")}
          startIcon={<ArrowBackIcon />}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            fontWeight: "bold",
          }}
        >
          Go Back to Restaurants
        </Button>
      </Box>

      {/* Booking Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Meal Date"
            type="date"
            value={booking.mealDate}
            onChange={(e) => setBooking({ ...booking, mealDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Meal Time"
            select
            value={booking.mealTime}
            onChange={(e) => setBooking({ ...booking, mealTime: e.target.value })}
            fullWidth
          >
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
          </TextField>
          <TextField
            label="Total People"
            type="number"
            value={booking.totalPeople}
            onChange={(e) => setBooking({ ...booking, totalPeople: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmBooking}>
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

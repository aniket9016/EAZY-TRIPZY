import { useLocation, useNavigate } from "react-router-dom";
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
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addRestaurantBooking } from "../../api/getApis";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

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
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state as Restaurant | undefined;

  const token = useAuthStore((s) => s.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [booking, setBooking] = useState({
    mealDate: "",
    mealTime: "Lunch",
    totalPeople: "1",
  });

  const [errors, setErrors] = useState({
    mealDate: "",
    totalPeople: "",
  });

  useEffect(() => {
    if (!restaurant) navigate("/restaurants");
  }, [restaurant, navigate]);

  const handleBooking = () => {
    if (!token || !userID) {
      toast.warn("Please login or sign up to book the restaurant.");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmBooking = async () => {
    let hasError = false;
    const newErrors = { mealDate: "", totalPeople: "" };
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(booking.mealDate).setHours(0, 0, 0, 0);

    if (!booking.mealDate) {
      newErrors.mealDate = "Please select a meal date.";
      hasError = true;
    } else if (selectedDate < today) {
      newErrors.mealDate = "You cannot book a past date.";
      hasError = true;
    }

    const people = parseInt(booking.totalPeople);
    if (!booking.totalPeople || isNaN(people) || people < 1) {
      newErrors.totalPeople = "Total people must be at least 1.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

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
      toast.success("Restaurant booking confirmed!");
      setConfirmDialog(false);
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error", error);
      toast.error("Booking failed. Try again.");
    }
  };

  if (!restaurant) {
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
        <Button variant="contained" onClick={handleBooking} sx={{ flexGrow: 1 }}>
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
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Meal Date"
            type="date"
            value={booking.mealDate}
            onChange={(e) => {
              setBooking({ ...booking, mealDate: e.target.value });
              if (errors.mealDate) setErrors({ ...errors, mealDate: "" });
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            error={!!errors.mealDate}
            helperText={errors.mealDate}
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
            onChange={(e) => {
              setBooking({ ...booking, totalPeople: e.target.value });
              if (errors.totalPeople) setErrors({ ...errors, totalPeople: "" });
            }}
            inputProps={{ min: 1 }}
            error={!!errors.totalPeople}
            helperText={errors.totalPeople}
            fullWidth
          />

          {/* Booking Summary */}
          {booking.mealDate && booking.totalPeople && !isNaN(parseInt(booking.totalPeople)) && (
            <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "#f9f9f9" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Booking Summary
              </Typography>

              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={`https://localhost:7032/Images/Restaurant/${restaurant.image}`}
                  alt={restaurant.name}
                  style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/no-image.png";
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  {restaurant.name}
                </Typography>
              </Box>

              <Box mt={1}>
                <Typography variant="body2">
                  <strong>Meal Date:</strong> {booking.mealDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Meal Time:</strong> {booking.mealTime}
                </Typography>
                <Typography variant="body2">
                  <strong>Total People:</strong> {booking.totalPeople}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Booking Status: Pending
                </Typography>
              </Box>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmBooking}>
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

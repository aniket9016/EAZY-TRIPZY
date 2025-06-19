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
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addHotelBooking } from "../../api/getApis";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface Hotel {
  id: string;
  name: string;
  desc: string;
  address: string;
  country: string;
  city: string;
  price: string;
  rooms: string;
  image: string;
  package: string;
}

const roomTypes = [
  "King",
  "Delux",
  "Queen",
  "Deluxe",
  "Double",
  "Executive",
  "Family",
  "Studio",
  "Single",
  "Twin",
  "Suite",
];

export default function HotelDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hotel = state as Hotel | undefined;

  const token = useAuthStore((s) => s.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [booking, setBooking] = useState({
    checkindate: "",
    checkoutdate: "",
    noofPeople: "1",
    roomType: "Deluxe",
  });

  const [errors, setErrors] = useState({
    checkindate: "",
    checkoutdate: "",
    noofPeople: "",
  });

  useEffect(() => {
    if (!hotel) navigate("/hotels");
  }, [hotel, navigate]);

  const handleBooking = () => {
    if (!token || !userID) {
      toast.warn("Please login or sign up to book the hotel.");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmBooking = async () => {
    let hasError = false;
    const newErrors = { checkindate: "", checkoutdate: "", noofPeople: "" };
    const checkIn = new Date(booking.checkindate).getTime();
    const checkOut = new Date(booking.checkoutdate).getTime();

    if (!booking.checkindate) {
      newErrors.checkindate = "Please select a check-in date.";
      hasError = true;
    }
    if (!booking.checkoutdate) {
      newErrors.checkoutdate = "Please select a check-out date.";
      hasError = true;
    } else if (checkOut <= checkIn) {
      newErrors.checkoutdate = "Check-out must be after check-in.";
      hasError = true;
    }

    const people = parseInt(booking.noofPeople);
    if (!booking.noofPeople || isNaN(people) || people < 1) {
      newErrors.noofPeople = "Guests must be at least 1.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const pricePerNight = parseFloat(hotel?.price ?? "0");
    const numberOfDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = numberOfDays * pricePerNight;

    try {
      await addHotelBooking({
        userID: userID ?? "",
        hotelID: hotel?.id ?? "",
        bookingDate: new Date().toISOString(),
        checkindate: booking.checkindate,
        checkoutdate: booking.checkoutdate,
        price: totalPrice.toString(),
        bookingStatus: "Pending",
        noofPeople: booking.noofPeople,
        roomType: booking.roomType,
      });

      toast.success("Hotel booking confirmed!");
      setConfirmDialog(false);
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Failed to book. Try again.");
    }
  };

  if (!hotel) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <HotelIcon color="primary" />
        <Typography variant="h4">{hotel.name}</Typography>
      </Box>

      <img
        src={`https://localhost:7032/Images/Hotel/${hotel.image}`}
        alt={hotel.name}
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
          <Typography>{hotel.desc}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon color="secondary" />
          <Typography>
            {hotel.address}, {hotel.city}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <PublicIcon />
          <Typography>{hotel.country}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <HotelIcon />
          <Typography>
            ₹{hotel.price} / night - {hotel.package}
          </Typography>
        </Box>
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="contained" onClick={handleBooking} sx={{ flexGrow: 1 }}>
          Book Hotel
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/hotels")}
          startIcon={<ArrowBackIcon />}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            fontWeight: "bold",
          }}
        >
          Go Back to Hotels
        </Button>
      </Box>

      {/* Booking Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Hotel Booking</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Check-In Date"
            type="date"
            value={booking.checkindate}
            onChange={(e) => {
              setBooking({ ...booking, checkindate: e.target.value });
              if (errors.checkindate) setErrors({ ...errors, checkindate: "" });
            }}
            InputLabelProps={{
              shrink: true,
              style: {
                backgroundColor: "#fff",
                padding: "0 4px",
                fontSize: "14px",
              },
            }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            error={!!errors.checkindate}
            helperText={errors.checkindate}
            fullWidth
          />
          <TextField
            label="Check-Out Date"
            type="date"
            value={booking.checkoutdate}
            onChange={(e) => {
              setBooking({ ...booking, checkoutdate: e.target.value });
              if (errors.checkoutdate) setErrors({ ...errors, checkoutdate: "" });
            }}
            InputLabelProps={{
              shrink: true,
              style: {
                backgroundColor: "#fff",
                padding: "0 4px",
                fontSize: "14px",
              },
            }}
            inputProps={{ min: booking.checkindate }}
            error={!!errors.checkoutdate}
            helperText={errors.checkoutdate}
            fullWidth
          />
          <TextField
            label="Guests"
            type="number"
            value={booking.noofPeople}
            onChange={(e) => {
              setBooking({ ...booking, noofPeople: e.target.value });
              if (errors.noofPeople) setErrors({ ...errors, noofPeople: "" });
            }}
            inputProps={{ min: 1 }}
            error={!!errors.noofPeople}
            helperText={errors.noofPeople}
            fullWidth
          />
          <TextField
            label="Room Type"
            select
            value={booking.roomType}
            onChange={(e) => setBooking({ ...booking, roomType: e.target.value })}
            fullWidth
          >
            {roomTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
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

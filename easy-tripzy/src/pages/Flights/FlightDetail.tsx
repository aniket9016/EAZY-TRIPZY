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
  Paper,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthStore } from "../../store/authStore";
import { addFlightBooking } from "../../api/getApis";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface Flight {
  id: string;
  name: string;
  departingDate: string;
  returningDate: string;
  departingCity: string;
  destinationCity: string;
  price: string;
  image: string;
  type: string;
}

export default function FlightDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state as Flight | undefined;

  const token = useAuthStore((s) => s.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [booking, setBooking] = useState({
    bookingDate: "",
    adults: "1",
    kids: "0",
  });

  const [errors, setErrors] = useState({
    bookingDate: "",
    adults: "",
  });

  useEffect(() => {
    if (!flight) navigate("/flights");
  }, [flight, navigate]);

  const handleBooking = () => {
    if (!token || !userID) {
      toast.warn("Please login or sign up to book the flight.");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmBooking = async () => {
    let hasError = false;
    const newErrors = { bookingDate: "", adults: "" };
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(booking.bookingDate).setHours(0, 0, 0, 0);

    if (!booking.bookingDate) {
      newErrors.bookingDate = "Please select a booking date.";
      hasError = true;
    } else if (selectedDate < today) {
      newErrors.bookingDate = "Booking date cannot be in the past.";
      hasError = true;
    }

    const adultsCount = parseInt(booking.adults);
    const kidsCount = parseInt(booking.kids) || 0;

    if (!booking.adults || isNaN(adultsCount) || adultsCount < 1) {
      newErrors.adults = "At least 1 adult is required.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const price = parseFloat(flight?.price ?? "0");
    const totalPrice = adultsCount * price + kidsCount * price * 0.5;

    try {
      await addFlightBooking({
        userID: userID ?? "",
        flightID: flight?.id ?? "",
        bookingDate: booking.bookingDate,
        adults: booking.adults,
        kids: booking.kids,
        price: totalPrice,
      });
      toast.success("Flight booking confirmed!");
      setConfirmDialog(false);
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Failed to book. Try again.");
    }
  };

  const price = parseFloat(flight?.price ?? "0");
  const adults = parseInt(booking.adults) || 0;
  const kids = parseInt(booking.kids) || 0;
  const totalPrice = adults * price + kids * price * 0.5;
  const totalPriceDisplay = totalPrice.toFixed(2);

  if (!flight) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <FlightIcon color="primary" />
        <Typography variant="h4">{flight.name}</Typography>
      </Box>

      <img
        src={`https://localhost:7032/Images/Flight/${flight.image}`}
        alt={flight.name}
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
          <InfoIcon color="primary" />
          <Typography>
            {flight.departingCity} → {flight.destinationCity} ({flight.type})
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon color="secondary" />
          <Typography>{flight.departingDate} to {flight.returningDate}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <PublicIcon />
          <Typography>₹{flight.price} per adult</Typography>
        </Box>
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="contained" onClick={handleBooking} sx={{ flexGrow: 1 }}>
          Book Flight
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/flights")}
          startIcon={<ArrowBackIcon />}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            fontWeight: "bold",
          }}
        >
          Go Back to Flights
        </Button>
      </Box>

      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Flight Booking</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Booking Date"
            type="date"
            value={booking.bookingDate}
            onChange={(e) => {
              setBooking({ ...booking, bookingDate: e.target.value });
              if (errors.bookingDate) setErrors({ ...errors, bookingDate: "" });
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            error={!!errors.bookingDate}
            helperText={errors.bookingDate}
            fullWidth
          />

          <TextField
            label="Adults"
            type="number"
            value={booking.adults}
            onChange={(e) => {
              setBooking({ ...booking, adults: e.target.value });
              if (errors.adults) setErrors({ ...errors, adults: "" });
            }}
            inputProps={{ min: 1 }}
            error={!!errors.adults}
            helperText={errors.adults}
            fullWidth
          />

          <TextField
            label="Kids"
            type="number"
            value={booking.kids}
            onChange={(e) => setBooking({ ...booking, kids: e.target.value })}
            inputProps={{ min: 0 }}
            fullWidth
          />

          {booking.bookingDate && !errors.bookingDate && !errors.adults && parseInt(booking.adults) >= 1 && (
            <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "#f9f9f9" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Booking Summary
              </Typography>

              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src={`https://localhost:7032/Images/Flight/${flight.image}`}
                  alt={flight.name}
                  style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/no-image.png";
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  {flight.name}
                </Typography>
              </Box>

              <Box mt={1}>
                <Typography variant="body2">
                  <strong>Booking Date:</strong> {booking.bookingDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Adults:</strong> {booking.adults}
                </Typography>
                <Typography variant="body2">
                  <strong>Kids:</strong> {booking.kids}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Total Price: ₹{totalPriceDisplay}
                </Typography>
              </Box>
            </Paper>
          )}

          <TextField
            label="Total Price (₹)"
            value={totalPriceDisplay}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmBooking}>Confirm Booking</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

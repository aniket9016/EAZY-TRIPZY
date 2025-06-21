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
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { useAuthStore } from "../../store/authStore";
import { addFlightBooking } from "../../api/getApis";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface Flight {
  id: string;
  name: string;
  departingDate: string;
  returningDate: string;
  departingTime?: string;
  returningTime?: string;
  departingCountry?: string;
  departingCity: string;
  destinationCountry?: string;
  destinationCity: string;
  combinedDepLocation?: string;
  combinedDestination?: string;
  returnDepartingTime?: string;
  returnArrivingTime?: string;
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
    ? decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString || timeString === "N/A") return "N/A";
    return timeString;
  };

  if (!flight) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <AirplanemodeActiveIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" fontWeight="bold">
          {flight.name}
        </Typography>
        <Chip
          label={flight.type}
          color={flight.type === "Round Trip" ? "primary" : "secondary"}
          variant="outlined"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Flight Image */}
        <Grid>
          <img
            src={`https://localhost:7032/Images/Flight/${flight.image}`}
            alt={flight.name}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/no-image.png";
            }}
          />
        </Grid>

        {/* Flight Details */}
        <Grid>
          <Paper sx={{ p: 3, height: "fit-content", boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
              Flight Information
            </Typography>

            {/* Route Information */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <LocationOnIcon color="primary" />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {flight.combinedDepLocation || flight.departingCity}
                  {flight.departingCountry && ` (${flight.departingCountry})`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Departure
                </Typography>
              </Box>
              <FlightIcon sx={{ mx: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {flight.combinedDestination || flight.destinationCity}
                  {flight.destinationCountry &&
                    ` (${flight.destinationCountry})`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Destination
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Departure Details */}
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Outbound Flight
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CalendarTodayIcon fontSize="small" color="secondary" />
                <Typography variant="body2">
                  <strong>Date:</strong> {formatDate(flight.departingDate)}
                </Typography>
              </Box>
              {flight.departingTime && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon fontSize="small" color="secondary" />
                  <Typography variant="body2">
                    <strong>Departure:</strong>{" "}
                    {formatTime(flight.departingTime)}
                  </Typography>
                </Box>
              )}
              {flight.returningTime && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon fontSize="small" color="secondary" />
                  <Typography variant="body2">
                    <strong>Arrival:</strong> {formatTime(flight.returningTime)}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Return Details (if Round Trip) */}
            {flight.type === "Round Trip" && flight.returningDate && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Return Flight
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarTodayIcon fontSize="small" color="secondary" />
                    <Typography variant="body2">
                      <strong>Date:</strong> {formatDate(flight.returningDate)}
                    </Typography>
                  </Box>
                  {flight.returnDepartingTime && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon fontSize="small" color="secondary" />
                      <Typography variant="body2">
                        <strong>Departure:</strong>{" "}
                        {formatTime(flight.returnDepartingTime)}
                      </Typography>
                    </Box>
                  )}
                  {flight.returnArrivingTime && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon fontSize="small" color="secondary" />
                      <Typography variant="body2">
                        <strong>Arrival:</strong>{" "}
                        {formatTime(flight.returnArrivingTime)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Price Information */}
            <Box display="flex" alignItems="center" gap={1}>
              <PublicIcon color="primary" />
              <Typography variant="h6" fontWeight="bold" color="primary">
                ₹{parseInt(flight.price).toLocaleString()} per adult
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          onClick={handleBooking}
          size="large"
          sx={{ minWidth: 200, py: 1.5 }}
        >
          Book This Flight
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/flights")}
          startIcon={<ArrowBackIcon />}
          size="large"
          sx={{
            minWidth: 200,
            py: 1.5,
            color: "primary.main",
            borderColor: "primary.main",
            "&:hover": {
              borderColor: "primary.dark",
              backgroundColor: "primary.50",
            },
          }}
        >
          Back to Flights
        </Button>
      </Box>

      {/* Booking Confirmation Dialog */}
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <FlightIcon color="primary" />
            Confirm Flight Booking
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
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
            label="Kids (50% discount)"
            type="number"
            value={booking.kids}
            onChange={(e) => setBooking({ ...booking, kids: e.target.value })}
            inputProps={{ min: 0 }}
            fullWidth
          />

          {booking.bookingDate &&
            !errors.bookingDate &&
            !errors.adults &&
            parseInt(booking.adults) >= 1 && (
              <Paper
                elevation={2}
                sx={{ p: 2, mt: 2, backgroundColor: "#f8f9fa" }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Booking Summary
                </Typography>

                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <img
                    src={`https://localhost:7032/Images/Flight/${flight.image}`}
                    alt={flight.name}
                    style={{
                      width: 60,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/no-image.png";
                    }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {flight.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {flight.departingCity} → {flight.destinationCity}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Booking Date:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(booking.bookingDate)}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Adults:</strong>
                  </Typography>
                  <Typography variant="body2">{booking.adults}</Typography>

                  <Typography variant="body2">
                    <strong>Kids:</strong>
                  </Typography>
                  <Typography variant="body2">{booking.kids}</Typography>

                  <Typography variant="body2" fontWeight="bold">
                    <strong>Total Price:</strong>
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    ₹{totalPriceDisplay}
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

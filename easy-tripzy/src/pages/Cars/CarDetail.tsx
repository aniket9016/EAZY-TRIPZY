// src/pages/Cars/CarDetail.tsx
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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addCarBooking, getLocations } from "../../api/getApis";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface Car {
  id: string;
  name: string;
  desc: string;
  country: string;
  city: string;
  price: string;
  seatingCapacity: string;
  image: string;
}

interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
}

export default function CarDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const car = state as Car | undefined;

  const token = useAuthStore((s) => s.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;

  const [locations, setLocations] = useState<Location[]>([]);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [booking, setBooking] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocationId: "",
    returnLocationId: "",
  });

  const [errors, setErrors] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocationId: "",
    returnLocationId: "",
  });

  useEffect(() => {
    if (!car) navigate("/cars");

    getLocations()
      .then((res) => {
        const data = res?.data;
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          console.warn("Invalid location data format", res);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch locations", err);
        toast.error("Failed to load locations.");
      });
  }, [car, navigate]);

  const handleBooking = () => {
    if (!token || !userID) {
      toast.warn("Please login or sign up to book the car.");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmBooking = async () => {
    let hasError = false;
    const newErrors = { pickupDate: "", returnDate: "", pickupLocationId: "", returnLocationId: "" };

    const pickup = new Date(booking.pickupDate).getTime();
    const returnD = new Date(booking.returnDate).getTime();

    if (!booking.pickupDate) {
      newErrors.pickupDate = "Select pickup date.";
      hasError = true;
    }

    if (!booking.returnDate) {
      newErrors.returnDate = "Select return date.";
      hasError = true;
    } else if (returnD < pickup) {
      newErrors.returnDate = "Return cannot be before pickup.";
      hasError = true;
    }

    if (!booking.pickupLocationId) {
      newErrors.pickupLocationId = "Select pickup location.";
      hasError = true;
    }

    if (!booking.returnLocationId) {
      newErrors.returnLocationId = "Select return location.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const rentalDays = Math.max(1, Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24)));
    const pricePerDay = parseFloat(car?.price ?? "0");
    const totalAmount = rentalDays * pricePerDay;

    try {
      await addCarBooking({
        userID,
        carID: car?.id ?? "",
        Pickup_Location_Id: booking.pickupLocationId,
        Return_Location_Id: booking.returnLocationId,
        PickupDate: booking.pickupDate,
        ReturnDate: booking.returnDate,
        BookingDate: new Date().toISOString(),
        Rental_days: rentalDays,
        TotalAmount: totalAmount,
        Status: "Pending",
      });

      toast.success("Car booked successfully!");
      setConfirmDialog(false);
      navigate("/my-bookings");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book car.");
    }
  };

  const pickupTime = new Date(booking.pickupDate).getTime();
  const returnTime = new Date(booking.returnDate).getTime();
  const days = pickupTime && returnTime && returnTime >= pickupTime
    ? Math.max(1, Math.ceil((returnTime - pickupTime) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalDisplay = (days * parseFloat(car?.price ?? "0")).toFixed(2);

  if (!car) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <DirectionsCarIcon color="primary" />
        <Typography variant="h4">{car.name}</Typography>
      </Box>

      <img
        src={`https://localhost:7032/Images/Car/${car.image}`}
        alt={car.name}
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
          <Typography>{car.desc}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon color="secondary" />
          <Typography>{car.city}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <PublicIcon />
          <Typography>{car.country}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <DirectionsCarIcon />
          <Typography>
            ₹{car.price} / day - {car.seatingCapacity} seats
          </Typography>
        </Box>
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="contained" onClick={handleBooking} sx={{ flexGrow: 1 }}>
          Book Car
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/cars")}
          startIcon={<ArrowBackIcon />}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            fontWeight: "bold",
          }}
        >
          Go Back to Cars
        </Button>
      </Box>

      {/* Booking Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Car Booking</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            select
            label="Pickup Location"
            value={booking.pickupLocationId}
            onChange={(e) => {
              setBooking({ ...booking, pickupLocationId: e.target.value });
              if (errors.pickupLocationId) setErrors({ ...errors, pickupLocationId: "" });
            }}
            error={!!errors.pickupLocationId}
            helperText={errors.pickupLocationId}
            fullWidth
          >
            {locations.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}, {l.city}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Return Location"
            value={booking.returnLocationId}
            onChange={(e) => {
              setBooking({ ...booking, returnLocationId: e.target.value });
              if (errors.returnLocationId) setErrors({ ...errors, returnLocationId: "" });
            }}
            error={!!errors.returnLocationId}
            helperText={errors.returnLocationId}
            fullWidth
          >
            {locations.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}, {l.city}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Pickup Date"
            type="date"
            value={booking.pickupDate}
            onChange={(e) => {
              setBooking({ ...booking, pickupDate: e.target.value });
              if (errors.pickupDate) setErrors({ ...errors, pickupDate: "" });
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            error={!!errors.pickupDate}
            helperText={errors.pickupDate}
            fullWidth
          />

          <TextField
            label="Return Date"
            type="date"
            value={booking.returnDate}
            onChange={(e) => {
              setBooking({ ...booking, returnDate: e.target.value });
              if (errors.returnDate) setErrors({ ...errors, returnDate: "" });
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: booking.pickupDate }}
            error={!!errors.returnDate}
            helperText={errors.returnDate}
            fullWidth
          />

          {/* Booking Summary Section */}
          {booking.pickupDate &&
            booking.returnDate &&
            booking.pickupLocationId &&
            booking.returnLocationId && (
              <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "#f9f9f9" }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Booking Summary
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={`https://localhost:7032/Images/Car/${car.image}`}
                    alt={car.name}
                    style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/no-image.png";
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold">{car.name}</Typography>
                </Box>

                <Box mt={1}>
                  <Typography variant="body2">
                    <strong>Pickup Location:</strong>{" "}
                    {locations.find((l) => l.id === booking.pickupLocationId)?.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Return Location:</strong>{" "}
                    {locations.find((l) => l.id === booking.returnLocationId)?.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pickup Date:</strong> {booking.pickupDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Return Date:</strong> {booking.returnDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rental Days:</strong> {days}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price/Day:</strong> ₹{car.price}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Total Price: ₹{totalDisplay}
                  </Typography>
                </Box>
              </Paper>
            )}

          <TextField
            label="Total Price (₹)"
            value={totalDisplay}
            InputProps={{ readOnly: true }}
            fullWidth
          />
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

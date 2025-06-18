// src/pages/MyBookings.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Pagination,
  CardMedia,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getCarBookings,
  getFlightBookings,
  getHotelBookings,
  getRestaurantBookings,
  deleteCarBooking,
  deleteFlightBooking,
  deleteHotelBooking,
  deleteRestaurantBooking,
  getCarById,
  getHotelById,
  getRestaurantById,
  getFlightBookingById,
} from "../api/getApis";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

function isCancellable(dateStr: string) {
  const bookingDate = new Date(dateStr);
  const today = new Date();
  const diffDays = (bookingDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
  return diffDays >= 7;
}

const CARDS_PER_PAGE = 6;

export default function MyBookings() {
  const token = useAuthStore((s) => s.token);
  const decoded: any = token ? jwtDecode(token) : null;
  const userID = decoded
    ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    : null;
  const username = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const [carBookings, setCarBookings] = useState<any[]>([]);
  const [flightBookings, setFlightBookings] = useState<any[]>([]);
  const [hotelBookings, setHotelBookings] = useState<any[]>([]);
  const [restaurantBookings, setRestaurantBookings] = useState<any[]>([]);
  const [pages, setPages] = useState({ car: 1, flight: 1, hotel: 1, restaurant: 1 });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookingInfo, setSelectedBookingInfo] = useState<{
    type: string;
    id: string;
    date: string;
    isPast: boolean;
  } | null>(null);

  const getImageUrl = (type: string, image: string) =>
    `https://localhost:7032/Images/${type}/${image}`;

  const fetchDetails = async (type: string, bookings: any[]) => {
    const detailPromises = bookings.map(async (b) => {
      let details = null;
      switch (type) {
        case "car":
          details = await getCarById(b.carID);
          return { ...b, details: details.data };
        case "hotel":
          details = await getHotelById(b.hotelID);
          return { ...b, details: details.data };
        case "restaurant":
          details = await getRestaurantById(b.restaurantID);
          return { ...b, details: details.data };
        case "flight":
          details = await getFlightBookingById(b.flightID);
          return { ...b, details: details.data };
      }
    });
    return await Promise.all(detailPromises);
  };

  const fetchAll = async () => {
    try {
      const [carRes, flightRes, hotelRes, restaurantRes] = await Promise.all([
        getCarBookings(),
        getFlightBookings(),
        getHotelBookings(),
        getRestaurantBookings(),
      ]);

      const userCars = carRes.data.filter((b: any) => b.userID === userID);
      const userFlights = flightRes.data.filter((b: any) => b.userID === userID);
      const userHotels = hotelRes.data.filter((b: any) => b.userID === userID);
      const userRestaurants = restaurantRes.data.filter((b: any) => b.userID === userID);

      const [carsWithDetails, flightsWithDetails, hotelsWithDetails, restaurantsWithDetails] =
        await Promise.all([
          fetchDetails("car", userCars),
          fetchDetails("flight", userFlights),
          fetchDetails("hotel", userHotels),
          fetchDetails("restaurant", userRestaurants),
        ]);

      setCarBookings(carsWithDetails);
      setFlightBookings(flightsWithDetails);
      setHotelBookings(hotelsWithDetails);
      setRestaurantBookings(restaurantsWithDetails);
    } catch (err) {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userID) fetchAll();
  }, [userID]);

  const handleCancelOrDelete = async () => {
    if (!selectedBookingInfo) return;
    const { type, id, date, isPast } = selectedBookingInfo;

    try {
      if (!isPast && !isCancellable(date)) {
        toast.warn("Bookings can only be cancelled at least 7 days in advance.");
        return;
      }

      switch (type) {
        case "car":
          await deleteCarBooking(id);
          break;
        case "flight":
          await deleteFlightBooking(id);
          break;
        case "hotel":
          await deleteHotelBooking(id);
          break;
        case "restaurant":
          await deleteRestaurantBooking(id);
          break;
      }

      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} booking ${
          isPast ? "deleted" : "cancelled"
        }.`
      );
      setConfirmDialogOpen(false);
      setSelectedBookingInfo(null);
      fetchAll();
    } catch {
      toast.error(`Failed to ${isPast ? "delete" : "cancel"} booking.`);
    }
  };

  const filterBookings = (bookings: any[], dateField: string) => {
    return bookings.filter((b) =>
      view === "past" ? new Date(b[dateField]) < new Date() : new Date(b[dateField]) >= new Date()
    );
  };

  const renderCards = (filtered: any[], type: string, dateField: string, isPast: boolean) => {
    const page = pages[type as keyof typeof pages];
    const sorted = [...filtered].sort((a, b) =>
      isPast
        ? new Date(b[dateField]).getTime() - new Date(a[dateField]).getTime()
        : new Date(a[dateField]).getTime() - new Date(b[dateField]).getTime()
    );

    const start = (page - 1) * CARDS_PER_PAGE;
    const paginated = sorted.slice(start, start + CARDS_PER_PAGE);

    return (
      <>
        <Grid container spacing={2}>
          {paginated.map((b) => {
            const item = b.details;
            if (!item) return null;

            let bookingId = b.carBookingID || b.flightBookingID || b.hotelBookingID || b.restaurantBookingID;

            return (
              <Grid item xs={12} sm={6} md={4} key={bookingId}>
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={getImageUrl(type.charAt(0).toUpperCase() + type.slice(1), item.image)}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc || item.address || item.combinedDepLocation}
                    </Typography>
                    <Typography mt={1}>
                      Booking Date: {new Date(b[dateField]).toDateString()}
                    </Typography>
                    <Typography>User: {username}</Typography>
                    <Typography>Status: {b.status || "Confirmed"}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color={isPast ? "error" : "warning"}
                      startIcon={isPast ? <DeleteIcon /> : <CancelIcon />}
                      onClick={() => {
                        setSelectedBookingInfo({
                          type,
                          id: bookingId,
                          date: b[dateField],
                          isPast,
                        });
                        setConfirmDialogOpen(true);
                      }}
                    >
                      {isPast ? "Delete" : "Cancel"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {Math.ceil(filtered.length / CARDS_PER_PAGE) > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(filtered.length / CARDS_PER_PAGE)}
              page={page}
              onChange={(_, v) => setPages((prev) => ({ ...prev, [type]: v }))}
              color="primary"
            />
          </Box>
        )}
      </>
    );
  };

  const renderSection = (
    title: string,
    bookings: any[],
    type: string,
    dateField: string
  ) => {
    const filtered = filterBookings(bookings, dateField);
    if (filtered.length === 0) return null;

    return (
      <Box my={4}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          {title}
        </Typography>
        {renderCards(filtered, type, dateField, view === "past")}
      </Box>
    );
  };

  const allFilteredCounts = [
    filterBookings(carBookings, "bookingDate").length,
    filterBookings(flightBookings, "bookingDate").length,
    filterBookings(hotelBookings, "bookingDate").length,
    filterBookings(restaurantBookings, "mealDate").length,
  ];
  const hasAnyBooking = allFilteredCounts.some((count) => count > 0);

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Welcome, {username || "User"}
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Here are your bookings:
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, v) => v && setView(v)}
        sx={{ mb: 4 }}
      >
        <ToggleButton value="upcoming">Upcoming Bookings</ToggleButton>
        <ToggleButton value="past">Past Bookings</ToggleButton>
      </ToggleButtonGroup>

      {hasAnyBooking ? (
        <Grid container direction="column">
          {renderSection("Car Bookings", carBookings, "car", "bookingDate")}
          {renderSection("Flight Bookings", flightBookings, "flight", "bookingDate")}
          {renderSection("Hotel Bookings", hotelBookings, "hotel", "bookingDate")}
          {renderSection("Restaurant Bookings", restaurantBookings, "restaurant", "mealDate")}
        </Grid>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No {view === "upcoming" ? "upcoming" : "past"} bookings found.
        </Typography>
      )}

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>
          Confirm {selectedBookingInfo?.isPast ? "Delete" : "Cancel"} Booking
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedBookingInfo?.isPast ? "delete" : "cancel"} this
            booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>No</Button>
          <Button onClick={handleCancelOrDelete} variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

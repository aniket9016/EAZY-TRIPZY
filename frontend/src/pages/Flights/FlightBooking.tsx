// src/components/FlightBooking.tsx
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getFlightBookings,
  addFlightBooking,
  editFlightBooking,
  deleteFlightBooking,
} from "../../api/flightBooking";
import { getUsers } from "../../api/users";
import { getFlights } from "../../api/flight";

interface FlightBooking {
  id: string;
  userID: string;
  flightID: string;
  bookingDate: string;
  adults: string;
  kids: string;
  price: string;
}

interface User {
  id: string;
  name: string;
}

interface Flight {
  id: string;
  name: string;
}

export default function FlightBooking() {
  const [bookings, setBookings] = useState<FlightBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Partial<FlightBooking>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<FlightBooking | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, usersRes, flightsRes] = await Promise.all([
        getFlightBookings(),
        getUsers(),
        getFlights(),
      ]);

      const mapped = bookingsRes.data.map((b: any) => ({
        id: b.flightBookingID || b.id,
        userID: b.userID,
        flightID: b.flightID,
        bookingDate: b.bookingDate?.split("T")[0] || "",
        adults: b.adults,
        kids: b.kids,
        price: b.price?.toString() || "",
      }));

      setBookings(mapped);
      setUsers(usersRes.data);
      setFlights(flightsRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (booking?: FlightBooking) => {
    setSelectedBooking(booking || {});
    setIsEditMode(!!booking);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking({});
    setIsEditMode(false);
    setErrors({});
  };

  const handleFieldChange = (field: string, value: any) => {
    setSelectedBooking((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const { userID, flightID, bookingDate, adults, kids, price } = selectedBooking;

    if (!userID) newErrors.userID = "User is required";
    if (!flightID) newErrors.flightID = "Flight is required";
    if (!bookingDate) newErrors.bookingDate = "Booking date is required";
    if (!adults) newErrors.adults = "Number of adults is required";
    if (!kids) newErrors.kids = "Number of kids is required";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Valid price required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const payload = {
      userID: selectedBooking.userID!,
      flightID: selectedBooking.flightID!,
      bookingDate: selectedBooking.bookingDate!,
      adults: selectedBooking.adults!,
      kids: selectedBooking.kids!,
      price: parseInt(selectedBooking.price!),
    };

    try {
      if (isEditMode && selectedBooking.id) {
        await editFlightBooking(selectedBooking.id, payload);
        toast.success("Booking updated");
      } else {
        await addFlightBooking(payload);
        toast.success("Booking added");
      }
      handleClose();
      loadData();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDeleteClick = (booking: FlightBooking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (bookingToDelete?.id) {
        await deleteFlightBooking(bookingToDelete.id);
        toast.success("Deleted successfully");
        loadData();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const getUserName = (id: string) => users.find((u) => u.id === id)?.name || "Unknown";
  const getFlightName = (id: string) => flights.find((f) => f.id === id)?.name || "Unknown";
  const handlePageChange = (_: any, value: number) => setPage(value);
  const paginatedBookings = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Flight Bookings</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Booking
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack spacing={2}>
            {paginatedBookings.map((booking) => (
              <Paper key={booking.id} sx={{ p: 2 }}>
                <Typography><strong>User:</strong> {getUserName(booking.userID)}</Typography>
                <Typography><strong>Flight:</strong> {getFlightName(booking.flightID)}</Typography>
                <Typography><strong>Booking Date:</strong> {booking.bookingDate}</Typography>
                <Typography><strong>Adults:</strong> {booking.adults}</Typography>
                <Typography><strong>Kids:</strong> {booking.kids}</Typography>
                <Typography><strong>Price:</strong> ₹{booking.price}</Typography>
                <Box mt={1}>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleOpen(booking)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteClick(booking)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            ))}
          </Stack>

          {bookings.length > itemsPerPage && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(bookings.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditMode ? "Edit Booking" : "Add Booking"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="User *"
            value={selectedBooking.userID || ""}
            onChange={(e) => handleFieldChange("userID", e.target.value)}
            error={!!errors.userID}
            helperText={errors.userID}
            margin="dense"
          >
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Flight *"
            value={selectedBooking.flightID || ""}
            onChange={(e) => handleFieldChange("flightID", e.target.value)}
            error={!!errors.flightID}
            helperText={errors.flightID}
            margin="dense"
          >
            {flights.map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Booking Date *"
            type="date"
            value={selectedBooking.bookingDate || ""}
            onChange={(e) => handleFieldChange("bookingDate", e.target.value)}
            error={!!errors.bookingDate}
            helperText={errors.bookingDate}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Adults *"
            value={selectedBooking.adults || ""}
            onChange={(e) => handleFieldChange("adults", e.target.value)}
            error={!!errors.adults}
            helperText={errors.adults}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Kids *"
            value={selectedBooking.kids || ""}
            onChange={(e) => handleFieldChange("kids", e.target.value)}
            error={!!errors.kids}
            helperText={errors.kids}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Price *"
            type="number"
            value={selectedBooking.price || ""}
            onChange={(e) => handleFieldChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEditMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this booking?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
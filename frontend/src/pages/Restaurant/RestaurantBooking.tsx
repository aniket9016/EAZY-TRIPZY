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
  addRestaurantBooking,
  deleteRestaurantBooking,
  editRestaurantBooking,
  getRestaurantBookings,
} from "../../api/restaurantBooking";
import { getUsers } from "../../api/users";
import { getRestaurants } from "../../api/restaurants";

interface RestaurantBooking {
  id: string;
  userID: string;
  restaurantID: string;
  bookingDate: string;
  bookingTime: string;
  numberOfPeople: string; // store as string
  status: string;
}

interface User {
  id: string;
  name: string;
}

interface Restaurant {
  id: string;
  name: string;
}

const combineDateTime = (date: string, time: string) => `${date}T${time}`;
const extractDate = (datetime: string) => datetime.split("T")[0];
const extractTime = (datetime: string) => datetime.split("T")[1]?.substring(0, 5) || "";

export default function RestaurantBooking() {
  const [bookings, setBookings] = useState<RestaurantBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Partial<RestaurantBooking>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<RestaurantBooking | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, usersRes, restaurantsRes] = await Promise.all([
        getRestaurantBookings(),
        getUsers(),
        getRestaurants(),
      ]);

      const bookingsWithTime = bookingsRes.data.map((b: any) => ({
        id: b.restaurantBookingId || b.id,
        userID: b.userID,
        restaurantID: b.restaurantID,
        bookingDate: extractDate(b.bookingDate),
        bookingTime: extractTime(b.bookingDate),
        numberOfPeople: b.totalPeople?.toString() || "",
        status: b.status,
      }));

      setBookings(bookingsWithTime);
      setUsers(usersRes.data);
      setRestaurants(restaurantsRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (booking?: RestaurantBooking) => {
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
    const {
      userID,
      restaurantID,
      bookingDate,
      bookingTime,
      numberOfPeople,
      status,
    } = selectedBooking;

    if (!userID) newErrors.userID = "User is required";
    if (!restaurantID) newErrors.restaurantID = "Restaurant is required";
    if (!bookingDate) newErrors.bookingDate = "Booking date is required";
    if (!bookingTime) newErrors.bookingTime = "Booking time is required";
    if (!numberOfPeople || parseInt(numberOfPeople) <= 0)
      newErrors.numberOfPeople = "Number of people must be > 0";
    if (!status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const payload = {
      restaurantID: selectedBooking.restaurantID!,
      userID: selectedBooking.userID!,
      bookingDate: combineDateTime(
        selectedBooking.bookingDate!,
        selectedBooking.bookingTime!
      ),
      mealDate: selectedBooking.bookingDate!,
      mealTime: selectedBooking.bookingTime!,
      totalPeople: selectedBooking.numberOfPeople!,
      status: selectedBooking.status!,
    };

    try {
      if (isEditMode && selectedBooking.id) {
        await editRestaurantBooking(selectedBooking.id, payload);
        toast.success("Booking updated");
      } else {
        await addRestaurantBooking(payload);
        toast.success("Booking added");
      }
      handleClose();
      loadData();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDeleteClick = (booking: RestaurantBooking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (bookingToDelete?.id) {
        await deleteRestaurantBooking(bookingToDelete.id);
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
  const getRestaurantName = (id: string) =>
    restaurants.find((r) => r.id === id)?.name || "Unknown";

  const handlePageChange = (_: any, value: number) => setPage(value);
  const paginatedBookings = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Restaurant Bookings</Typography>
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
                <Typography><strong>Restaurant:</strong> {getRestaurantName(booking.restaurantID)}</Typography>
                <Typography><strong>Date:</strong> {booking.bookingDate}</Typography>
                <Typography><strong>Time:</strong> {booking.bookingTime}</Typography>
                <Typography><strong>People:</strong> {booking.numberOfPeople}</Typography>
                <Typography><strong>Status:</strong> {booking.status}</Typography>
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
            label="User"
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
            label="Restaurant"
            value={selectedBooking.restaurantID || ""}
            onChange={(e) => handleFieldChange("restaurantID", e.target.value)}
            error={!!errors.restaurantID}
            helperText={errors.restaurantID}
            margin="dense"
          >
            {restaurants.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                {r.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Booking Date"
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
            label="Booking Time"
            type="time"
            value={selectedBooking.bookingTime || ""}
            onChange={(e) => handleFieldChange("bookingTime", e.target.value)}
            error={!!errors.bookingTime}
            helperText={errors.bookingTime}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Number of People"
            type="number"
            value={selectedBooking.numberOfPeople || ""}
            onChange={(e) => handleFieldChange("numberOfPeople", e.target.value)}
            error={!!errors.numberOfPeople}
            helperText={errors.numberOfPeople}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Status"
            value={selectedBooking.status || ""}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            error={!!errors.status}
            helperText={errors.status}
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
          <DialogContentText>
            Are you sure you want to delete this booking?
          </DialogContentText>
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

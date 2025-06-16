// src/components/HotelBooking.tsx
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
  getHotelBookings,
  addHotelBooking,
  editHotelBooking,
  deleteHotelBooking,
} from "../../api/hotelBooking";
import { getHotels } from "../../api/hotels";
import { getUsers } from "../../api/users";

interface HotelBooking {
  id: string;
  userID: string;
  hotelID: string;
  bookingDate: string;
  checkindate: string;
  checkoutdate: string;
  price: string;
  bookingStatus: string;
  noofPeople: string;
  roomType: string;
}

interface User {
  id: string;
  name: string;
}

interface Hotel {
  id: string;
  name: string;
}

export default function HotelBooking() {
  const [bookings, setBookings] = useState<HotelBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Partial<HotelBooking>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<HotelBooking | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, usersRes, hotelsRes] = await Promise.all([
        getHotelBookings(),
        getUsers(),
        getHotels(),
      ]);

      const mapped = bookingsRes.data.map((b: any) => ({
        id: b.hotelBookingId || b.id,
        userID: b.userID,
        hotelID: b.hotelID,
        bookingDate: b.bookingDate?.split("T")[0] || "",
        checkindate: b.checkindate?.split("T")[0] || "",
        checkoutdate: b.checkoutdate?.split("T")[0] || "",
        price: b.price?.toString() || "",
        bookingStatus: b.bookingStatus || "",
        noofPeople: b.noofPeople?.toString() || "",
        roomType: b.roomType || "",
      }));

      setBookings(mapped);
      setUsers(usersRes.data);
      setHotels(hotelsRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (booking?: HotelBooking) => {
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
      hotelID,
      bookingDate,
      checkindate,
      checkoutdate,
      price,
      bookingStatus,
      noofPeople,
      roomType,
    } = selectedBooking;

    if (!userID) newErrors.userID = "User is required";
    if (!hotelID) newErrors.hotelID = "Hotel is required";
    if (!bookingDate) newErrors.bookingDate = "Booking date is required";
    if (!checkindate) newErrors.checkindate = "Check-in date is required";
    if (!checkoutdate) newErrors.checkoutdate = "Check-out date is required";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Price must be valid";
    if (!bookingStatus) newErrors.bookingStatus = "Status is required";
    if (!noofPeople || parseInt(noofPeople) <= 0)
      newErrors.noofPeople = "Number of people must be greater than 0";
    if (!roomType) newErrors.roomType = "Room type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const payload = {
      hotelID: selectedBooking.hotelID!,
      userID: selectedBooking.userID!,
      bookingDate: selectedBooking.bookingDate!,
      checkindate: selectedBooking.checkindate!,
      checkoutdate: selectedBooking.checkoutdate!,
      price: selectedBooking.price!,
      bookingStatus: selectedBooking.bookingStatus!,
      noofPeople: selectedBooking.noofPeople!,
      roomType: selectedBooking.roomType!,
    };

    try {
      if (isEditMode && selectedBooking.id) {
        await editHotelBooking(selectedBooking.id, payload);
        toast.success("Booking updated");
      } else {
        await addHotelBooking(payload);
        toast.success("Booking added");
      }
      handleClose();
      loadData();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDeleteClick = (booking: HotelBooking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (bookingToDelete?.id) {
        await deleteHotelBooking(bookingToDelete.id);
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
  const getHotelName = (id: string) => hotels.find((h) => h.id === id)?.name || "Unknown";
  const handlePageChange = (_: any, value: number) => setPage(value);
  const paginatedBookings = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Hotel Bookings</Typography>
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
                <Typography><strong>Hotel:</strong> {getHotelName(booking.hotelID)}</Typography>
                <Typography><strong>Booking Date:</strong> {booking.bookingDate}</Typography>
                <Typography><strong>Check-in:</strong> {booking.checkindate}</Typography>
                <Typography><strong>Check-out:</strong> {booking.checkoutdate}</Typography>
                <Typography><strong>Price:</strong> ₹{booking.price}</Typography>
                <Typography><strong>People:</strong> {booking.noofPeople}</Typography>
                <Typography><strong>Status:</strong> {booking.bookingStatus}</Typography>
                <Typography><strong>Room Type:</strong> {booking.roomType}</Typography>
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
            label="Hotel *"
            value={selectedBooking.hotelID || ""}
            onChange={(e) => handleFieldChange("hotelID", e.target.value)}
            error={!!errors.hotelID}
            helperText={errors.hotelID}
            margin="dense"
          >
            {hotels.map((h) => (
              <MenuItem key={h.id} value={h.id}>
                {h.name}
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
            label="Check-in Date *"
            type="date"
            value={selectedBooking.checkindate || ""}
            onChange={(e) => handleFieldChange("checkindate", e.target.value)}
            error={!!errors.checkindate}
            helperText={errors.checkindate}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Check-out Date *"
            type="date"
            value={selectedBooking.checkoutdate || ""}
            onChange={(e) => handleFieldChange("checkoutdate", e.target.value)}
            error={!!errors.checkoutdate}
            helperText={errors.checkoutdate}
            margin="dense"
            InputLabelProps={{ shrink: true }}
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

          <TextField
            fullWidth
            label="People *"
            type="number"
            value={selectedBooking.noofPeople || ""}
            onChange={(e) => handleFieldChange("noofPeople", e.target.value)}
            error={!!errors.noofPeople}
            helperText={errors.noofPeople}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Status *"
            value={selectedBooking.bookingStatus || ""}
            onChange={(e) => handleFieldChange("bookingStatus", e.target.value)}
            error={!!errors.bookingStatus}
            helperText={errors.bookingStatus}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Room Type *"
            value={selectedBooking.roomType || ""}
            onChange={(e) => handleFieldChange("roomType", e.target.value)}
            error={!!errors.roomType}
            helperText={errors.roomType}
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

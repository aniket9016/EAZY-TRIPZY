import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  FormHelperText,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getUsers } from "../../api/users";
import { getCars } from "../../api/cars";
import { getLocations } from "../../api/locations";
import {
  getCarBookings,
  addCarBooking,
  editCarBooking,
  deleteCarBooking,
} from "../../api/carBookings";

interface CarBooking {
  id: string;
  userID: string;
  carID: string;
  pickup_Location_Id: string;
  return_Location_Id: string;
  pickupDate: string;
  returnDate: string;
  bookingDate: string;
  rental_days: number;
  totalAmount: number;
  status: string;
}

interface User {
  id: string;
  name: string;
}

interface Car {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

export default function CarBookings() {
  const [bookings, setBookings] = useState<CarBooking[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Partial<CarBooking>>(
    {}
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<CarBooking | null>(
    null
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, usersRes, carsRes, locationsRes] = await Promise.all([
        getCarBookings(),
        getUsers(),
        getCars(),
        getLocations(),
      ]);
      setBookings(bookingsRes.data);
      setUsers(usersRes.data);
      setCars(carsRes.data);
      setLocations(locationsRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (booking?: CarBooking) => {
    setSelectedBooking(booking || {});
    setErrors({});
    setIsEditMode(!!booking);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedBooking({});
    setIsEditMode(false);
    setErrors({});
    setOpen(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    setSelectedBooking((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const {
      userID,
      carID,
      pickup_Location_Id,
      return_Location_Id,
      pickupDate,
      returnDate,
      bookingDate,
      rental_days,
      totalAmount,
      status,
    } = selectedBooking;

    if (!userID) newErrors.userID = "User is required";
    if (!carID) newErrors.carID = "Car is required";
    if (!pickup_Location_Id)
      newErrors.pickup_Location_Id = "Pickup location is required";
    if (!return_Location_Id)
      newErrors.return_Location_Id = "Return location is required";
    if (!pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!returnDate) newErrors.returnDate = "Return date is required";
    if (!bookingDate) newErrors.bookingDate = "Booking date is required";
    if (!rental_days || rental_days <= 0)
      newErrors.rental_days = "Rental days must be > 0";
    if (!totalAmount || totalAmount <= 0)
      newErrors.totalAmount = "Total amount must be > 0";
    if (!status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      if (isEditMode && selectedBooking.id) {
        await editCarBooking(selectedBooking.id, selectedBooking);
        toast.success("Booking updated");
      } else {
        await addCarBooking(selectedBooking);
        toast.success("Booking added");
      }
      handleClose();
      loadData();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDeleteClick = (booking: CarBooking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (bookingToDelete?.id) {
        await deleteCarBooking(bookingToDelete.id);
        toast.success("Deleted successfully");
        loadData();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getUserName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown User";
  const getCarName = (id: string) =>
    cars.find((c) => c.id === id)?.name || "Unknown Car";
  const getLocationName = (id: string) =>
    locations.find((l) => l.id === id)?.name || "Unknown Location";

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (_: any, value: number) => setPage(value);

  const paginatedBookings = bookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Car Bookings</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
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
              <Paper elevation={3} key={booking.id} sx={{ p: 2 }}>
                <Typography><strong>User:</strong> {getUserName(booking.userID)}</Typography>
                <Typography><strong>Car:</strong> {getCarName(booking.carID)}</Typography>
                <Typography><strong>Pickup:</strong> {getLocationName(booking.pickup_Location_Id)}</Typography>
                <Typography><strong>Return:</strong> {getLocationName(booking.return_Location_Id)}</Typography>
                <Typography><strong>Pickup Date:</strong> {booking.pickupDate?.substring(0, 10)}</Typography>
                <Typography><strong>Return Date:</strong> {booking.returnDate?.substring(0, 10)}</Typography>
                <Typography><strong>Status:</strong> {booking.status}</Typography>
                <Box mt={1}>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleOpen(booking)}><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteClick(booking)}><Delete /></IconButton>
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{isEditMode ? "Edit Booking" : "Add Booking"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" error={!!errors.userID}>
            <InputLabel>User</InputLabel>
            <Select
              value={selectedBooking.userID || ""}
              onChange={(e) => handleFieldChange("userID", e.target.value)}
              label="User"
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.name}
                </MenuItem>
              ))}
            </Select>
            {errors.userID && <FormHelperText>{errors.userID}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="dense" error={!!errors.carID}>
            <InputLabel>Car</InputLabel>
            <Select
              value={selectedBooking.carID || ""}
              onChange={(e) => handleFieldChange("carID", e.target.value)}
              label="Car"
            >
              {cars.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            {errors.carID && <FormHelperText>{errors.carID}</FormHelperText>}
          </FormControl>

          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.pickup_Location_Id}
          >
            <InputLabel>Pickup Location</InputLabel>
            <Select
              value={selectedBooking.pickup_Location_Id || ""}
              onChange={(e) =>
                handleFieldChange("pickup_Location_Id", e.target.value)
              }
              label="Pickup Location"
            >
              {locations.map((l) => (
                <MenuItem key={l.id} value={l.id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
            {errors.pickup_Location_Id && (
              <FormHelperText>{errors.pickup_Location_Id}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.return_Location_Id}
          >
            <InputLabel>Return Location</InputLabel>
            <Select
              value={selectedBooking.return_Location_Id || ""}
              onChange={(e) =>
                handleFieldChange("return_Location_Id", e.target.value)
              }
              label="Return Location"
            >
              {locations.map((l) => (
                <MenuItem key={l.id} value={l.id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
            {errors.return_Location_Id && (
              <FormHelperText>{errors.return_Location_Id}</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Pickup Date"
            type="date"
            margin="dense"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedBooking.pickupDate?.substring(0, 10) || ""}
            onChange={(e) => handleFieldChange("pickupDate", e.target.value)}
            error={!!errors.pickupDate}
            helperText={errors.pickupDate}
          />
          <TextField
            label="Return Date"
            type="date"
            margin="dense"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedBooking.returnDate?.substring(0, 10) || ""}
            onChange={(e) => handleFieldChange("returnDate", e.target.value)}
            error={!!errors.returnDate}
            helperText={errors.returnDate}
          />
          <TextField
            label="Booking Date"
            type="date"
            margin="dense"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={selectedBooking.bookingDate?.substring(0, 10) || ""}
            onChange={(e) => handleFieldChange("bookingDate", e.target.value)}
            error={!!errors.bookingDate}
            helperText={errors.bookingDate}
          />
          <TextField
            label="Rental Days"
            type="number"
            margin="dense"
            fullWidth
            value={selectedBooking.rental_days || ""}
            onChange={(e) =>
              handleFieldChange("rental_days", Number(e.target.value))
            }
            error={!!errors.rental_days}
            helperText={errors.rental_days}
          />
          <TextField
            label="Total Amount"
            type="number"
            margin="dense"
            fullWidth
            value={selectedBooking.totalAmount || ""}
            onChange={(e) =>
              handleFieldChange("totalAmount", Number(e.target.value))
            }
            error={!!errors.totalAmount}
            helperText={errors.totalAmount}
          />
          <TextField
            label="Status"
            margin="dense"
            fullWidth
            value={selectedBooking.status || ""}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            error={!!errors.status}
            helperText={errors.status}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this booking for{" "}
            <strong>{getUserName(bookingToDelete?.userID || "")}</strong> using
            car <strong>{getCarName(bookingToDelete?.carID || "")}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

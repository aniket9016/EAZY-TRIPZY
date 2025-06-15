import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, IconButton, Tooltip, Card, CardContent,
  CardActions, CardMedia, CircularProgress, DialogContentText, Pagination,
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getFlights,
  addFlight,
  updateFlight,
  deleteFlight
} from "../../api/flight";

interface Flight {
  id: string;
  name: string;
  image: string;
  price: number;
  departingDate: string;
  returningDate: string;
  departingTime: string;
  returningTime: string;
  departingCountry: string;
  departingCity: string;
  combinedDepLocation: string;
  combinedDestination: string;
  destinationCountry: string;
  destinationCity: string;
  returnDepartingTime: string;
  returnArrivingTime: string;
  type: string;
}

const initialForm = {
  name: "",
  price: "",
  departingDate: "",
  returningDate: "",
  departingTime: "",
  returningTime: "",
  departingCountry: "",
  departingCity: "",
  combinedDepLocation: "",
  combinedDestination: "",
  destinationCountry: "",
  destinationCity: "",
  returnDepartingTime: "",
  returnArrivingTime: "",
  type: "",
  image: ""
};

export default function Flights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [formData, setFormData] = useState({ ...initialForm });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editFlight, setEditFlight] = useState<Flight | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const paginatedFlights = flights.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getFlights();
      setFlights(data);
    } catch {
      toast.error("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (imageFile) form.append("Image", imageFile);
    if (editFlight) form.append("Id", editFlight.id);

    try {
      editFlight ? await updateFlight(form) : await addFlight(form);
      toast.success(editFlight ? "Flight updated" : "Flight added");
      closeDialog();
      fetchData();
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (flight: Flight) => {
    setEditFlight(flight);
    setFormData({
      ...flight,
      price: flight.price.toString()
    });
    setPreviewUrl(`https://localhost:7032/Images/Flight/${flight.image}`);
    setOpen(true);
  };

  const closeDialog = () => {
    setFormData({ ...initialForm });
    setEditFlight(null);
    setImageFile(null);
    setPreviewUrl(null);
    setOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFlight(deleteId);
      toast.success("Flight deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        ✈️ Manage Flights
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Flight
      </Button>

      {loading ? (
        <Box textAlign="center" mt={5}><CircularProgress /></Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedFlights.map((flight) => (
              <Grid item xs={12} sm={6} md={4} key={flight.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="160"
                    image={`https://localhost:7032/Images/Flight/${flight.image}`}
                    alt={flight.name}
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                  <CardContent>
                    <Typography variant="h6">{flight.name}</Typography>
                    <Typography variant="body2">Type: {flight.type}</Typography>
                    <Typography variant="body2">📍 {flight.departingCity} → {flight.destinationCity}</Typography>
                    <Typography variant="body2">🗓️ {flight.departingDate} → {flight.returningDate}</Typography>
                    <Typography variant="body2">⏰ {flight.departingTime} → {flight.returningTime}</Typography>
                    <Typography variant="body2">💰 ₹{flight.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(flight)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(flight.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(flights.length / rowsPerPage)}
              page={page}
              onChange={(_, val) => setPage(val)}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* Dialog Form */}
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editFlight ? "Edit Flight" : "Add Flight"}</DialogTitle>
        <DialogContent>
          {previewUrl && (
            <Box component="img" src={previewUrl} sx={{ width: "100%", height: 180, mb: 2, objectFit: "cover" }} />
          )}
          <Button variant="outlined" fullWidth component="label" sx={{ mb: 2 }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={handleImageChange} />
          </Button>

          {Object.keys(initialForm).map((key) => (
            key !== "image" && (
              <TextField
                key={key}
                name={key}
                label={key.replace(/([A-Z])/g, " $1")}
                fullWidth
                sx={{ mb: 2 }}
                value={(formData as any)[key]}
                onChange={handleInput}
              />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this flight?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

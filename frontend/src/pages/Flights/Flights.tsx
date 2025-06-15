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
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CircularProgress,
  DialogContentText,
  Pagination,
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
  deleteFlight,
} from "../../api/flight";

interface Flight {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
  departingDate: string;
  returningDate: string;
  departingTime: string;
  returningTime: string;
  departingCountry: string;
  departingCity: string;
  combinedDepLocation: string;
  destinationCountry: string;
  destinationCity: string;
  combinedDestination: string;
  returnDepartingTime: string;
  returnArrivingTime: string;
}

const initialForm = {
  name: "",
  image: "",
  price: "",
  type: "",
  departingDate: "",
  returningDate: "",
  departingTime: "",
  returningTime: "",
  departingCountry: "",
  departingCity: "",
  combinedDepLocation: "",
  destinationCountry: "",
  destinationCity: "",
  combinedDestination: "",
  returnDepartingTime: "",
  returnArrivingTime: "",
};

export default function Flights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [open, setOpen] = useState(false);
  const [editFlight, setEditFlight] = useState<Flight | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchFlights = async () => {
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
    fetchFlights();
  }, []);

  const paginatedFlights = flights.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((f) => ({ ...f, image: file.name }));
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "image") {
        newErrors[key] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const form = new FormData();

    if (editFlight) form.append("Id", editFlight.id);

    // Image: new or existing
    if (imageFile) {
      form.append("Image", imageFile);
    } else {
      form.append("ExistingImage", formData.image || "");
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        form.append(key, value);
      }
    });

    try {
      if (editFlight) {
        await updateFlight(form);
        toast.success("Flight updated successfully");
      } else {
        await addFlight(form);
        toast.success("Flight added successfully");
      }
      closeDialog();
      fetchFlights();
    } catch (err) {
      toast.error("Something went wrong while saving");
    }
  };

  const handleEdit = (f: Flight) => {
    setEditFlight(f);
    setFormData({
      name: f.name,
      image: f.image,
      price: f.price.toString(),
      type: f.type,
      departingDate: f.departingDate?.split("T")[0],
      returningDate: f.returningDate?.split("T")[0],
      departingTime: f.departingTime,
      returningTime: f.returningTime,
      departingCountry: f.departingCountry,
      departingCity: f.departingCity,
      combinedDepLocation: f.combinedDepLocation,
      destinationCountry: f.destinationCountry,
      destinationCity: f.destinationCity,
      combinedDestination: f.combinedDestination,
      returnDepartingTime: f.returnDepartingTime,
      returnArrivingTime: f.returnArrivingTime,
    });

    setPreviewUrl(
      f.image.startsWith("http")
        ? f.image
        : `https://localhost:7032/Images/Flight/${f.image}`
    );
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFlight(deleteId);
      toast.success("Flight deleted");
      fetchFlights();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const closeDialog = () => {
    setEditFlight(null);
    setFormData({ ...initialForm });
    setImageFile(null);
    setPreviewUrl(null);
    setOpen(false);
    setErrors({});
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
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
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {paginatedFlights.map((f) => (
              <Box key={f.id} sx={{ width: { xs: "100%", sm: "48%", md: "31%" }, minWidth: 280 }}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 2, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    src={
                      f.image.startsWith("http")
                        ? f.image
                        : `https://localhost:7032/Images/Flight/${f.image}`
                    }
                    alt={f.name}
                    sx={{ height: 160, objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{f.name}</Typography>
                    <Typography variant="body2">
                      🛫 {f.departingCity}, {f.departingCountry} → {f.destinationCity}, {f.destinationCountry}
                    </Typography>
                    <Typography variant="body2">
                      📅 {f.departingDate} → {f.returningDate}
                    </Typography>
                    <Typography variant="body2">
                      🕓 {f.departingTime} → {f.returningTime}
                    </Typography>
                    <Typography variant="h6" color="primary" mt={1}>
                      ₹{f.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(f)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(f.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          {Math.ceil(flights.length / rowsPerPage) > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(flights.length / rowsPerPage)}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editFlight ? "Edit Flight" : "Add Flight"}</DialogTitle>
        <DialogContent>
          {previewUrl && (
            <Box component="img" src={previewUrl} sx={{ width: "100%", height: 180, objectFit: "cover", mb: 2 }} />
          )}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={handleImageChange} />
          </Button>
          {Object.entries(initialForm).map(([key]) => {
            if (key === "image") return null;
            const isDate = key.toLowerCase().includes("date");
            const isPrice = key === "price";
            return (
              <TextField
                key={key}
                name={key}
                label={
                  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()) + " *"
                }
                fullWidth
                sx={{ mb: 2 }}
                value={(formData as any)[key]}
                onChange={handleInput}
                type={isDate ? "date" : isPrice ? "number" : "text"}
                error={Boolean(errors[key])}
                helperText={errors[key] || ""}
                InputLabelProps={isDate ? { shrink: true } : undefined}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this flight?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

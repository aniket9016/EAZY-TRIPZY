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
  Pagination, // <-- Imported for pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import { getApiClient } from "../../utils/api";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Car {
  id: string;
  name: string;
  desc: string;
  price: number;
  country: string;
  city: string;
  image: string;
  seatingCapacity: number;
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const carsPerPage = 6;

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    country: "",
    city: "",
    seatingCapacity: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const api = getApiClient();
      const res = await api.get("/Car/GetAllCar");
      setCars(res.data);
    } catch (err) {
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: file.name });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (
      !formData.seatingCapacity ||
      parseInt(formData.seatingCapacity) <= 0
    )
      newErrors.seatingCapacity = "Seating capacity must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const api = getApiClient();
      const form = new FormData();

      form.append("Name", formData.name);
      form.append("Desc", formData.desc);
      form.append("Price", formData.price);
      form.append("Country", formData.country);
      form.append("City", formData.city);
      form.append("SeatingCapacity", formData.seatingCapacity);

      if (imageFile) {
        form.append("image", imageFile);
      } else if (editCar?.image) {
        form.append("image", new Blob([]), formData.image);
      }

      if (editCar?.id) {
        await api.patch(`/Car/EditCar/${editCar.id}`, form);
        toast.success("Car updated successfully");
      } else {
        await api.post("/Car/AddCar", form);
        toast.success("Car added successfully");
      }

      closeDialog();
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save car");
    }
  };

  const handleEdit = (car: Car) => {
    setEditCar(car);
    setFormData({
      name: car.name,
      desc: car.desc,
      price: car.price.toString(),
      country: car.country,
      city: car.city,
      seatingCapacity: car.seatingCapacity.toString(),
      image: car.image,
    });
    setPreviewUrl(
      car.image.startsWith("http")
        ? car.image
        : `https://localhost:7032/Images/Car/${car.image}`
    );
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const api = getApiClient();
      await api.delete(`/Car/RemoveCar/${deleteId}`);
      toast.success("Car deleted successfully");
      fetchCars();
    } catch (err) {
      toast.error("Failed to delete car");
    } finally {
      setDeleteId(null);
    }
  };

  const closeDialog = () => {
    setEditCar(null);
    setFormData({
      name: "",
      desc: "",
      price: "",
      country: "",
      city: "",
      seatingCapacity: "",
      image: "",
    });
    setImageFile(null);
    setPreviewUrl(null);
    setErrors({});
    setOpen(false);
  };

  // PAGINATION LOGIC
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const paginatedCars = cars.slice((page - 1) * carsPerPage, page * carsPerPage);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        🚗 Manage Cars
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Car
      </Button>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {paginatedCars.map((car) => (
              <Box
                key={car.id}
                sx={{ width: { xs: "100%", sm: "48%", md: "32%" }, minWidth: 280 }}
              >
                <Card
                  sx={{
                    height: 380,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      car.image?.startsWith("http")
                        ? car.image
                        : `https://localhost:7032/Images/Car/${car.image}`
                    }
                    alt={car.name}
                    sx={{ height: 160, width: "100%", objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6">{car.name}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {car.desc}
                    </Typography>
                    <Typography variant="body2">
                      💰 ₹{car.price.toLocaleString()} | 🪑 {car.seatingCapacity} seats
                    </Typography>
                    <Typography variant="body2">
                      🌍 {car.city}, {car.country}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(car)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(car.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Add/Edit Car Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editCar ? "Edit Car" : "Add Car"}</DialogTitle>
        <DialogContent>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{ height: 180, width: "100%", objectFit: "cover", mb: 2 }}
            />
          )}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Image
            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
          </Button>
          {[
            { label: "Name", name: "name" },
            { label: "Description", name: "desc" },
            { label: "Price", name: "price", type: "number" },
            { label: "Country", name: "country" },
            { label: "City", name: "city" },
            { label: "Seating Capacity", name: "seatingCapacity", type: "number" },
          ].map(({ label, name, type }) => (
            <TextField
              key={name}
              label={
                <span>
                  {label} <span style={{ color: "red" }}>*</span>
                </span>
              }
              name={name}
              type={type || "text"}
              fullWidth
              sx={{ mb: 2 }}
              value={(formData as any)[name]}
              onChange={(e) => {
                setFormData({ ...formData, [name]: e.target.value });
                if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
              }}
              error={!!errors[name]}
              helperText={errors[name]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this car?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

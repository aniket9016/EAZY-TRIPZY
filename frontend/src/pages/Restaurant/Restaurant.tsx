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
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../api/restaurants";

const API_URL = "https://localhost:7032";

interface Restaurant {
  id: string;
  name: string;
  desc: string;
  address: string;
  country: string;
  city: string;
  phoneNumber: string;
  meals: string;
  image: string;
}

const initialForm = {
  name: "",
  desc: "",
  address: "",
  country: "",
  city: "",
  phoneNumber: "",
  meals: "",
  image: "",
};

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [open, setOpen] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const { data } = await getRestaurants();
      setRestaurants(data);
    } catch {
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  const paginated = restaurants.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((f) => ({ ...f, image: file.name }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val && key !== "image") {
        newErrors[key] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const form = new FormData();

    if (editRestaurant) {
      form.append("ID", editRestaurant.id);
    }

    Object.entries(formData).forEach(([k, v]) => {
      if (k !== "image") {
        form.append(k.charAt(0).toUpperCase() + k.slice(1), v);
      }
    });

    if (imageFile) {
      form.append("image", imageFile);
    } else if (editRestaurant?.image) {
      form.append("ExistingImage", editRestaurant.image);
    }

    try {
      if (editRestaurant) {
        await updateRestaurant(form);
        toast.success("Restaurant updated");
      } else {
        await addRestaurant(form);
        toast.success("Restaurant added");
      }
      closeDialog();
      fetchRestaurants();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleEdit = (r: Restaurant) => {
    setEditRestaurant(r);
    setFormData({
      name: r.name,
      desc: r.desc,
      address: r.address,
      country: r.country,
      city: r.city,
      phoneNumber: r.phoneNumber,
      meals: r.meals,
      image: r.image,
    });
    setPreviewUrl(`${API_URL}/Images/Restaurant/${r.image}`);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRestaurant(deleteId);
      toast.success("Restaurant deleted");
      fetchRestaurants();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const closeDialog = () => {
    setOpen(false);
    setEditRestaurant(null);
    setFormData({ ...initialForm });
    setImageFile(null);
    setPreviewUrl(null);
    setErrors({});
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", borderRadius: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🍽 Manage Restaurants
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Restaurant
      </Button>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {paginated.map((r) => (
              <Box key={r.id} sx={{ width: { xs: "100%", sm: "48%", md: "31%" }, minWidth: 280 }}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 2 }}>
                  <CardMedia
                    component="img"
                    src={`${API_URL}/Images/Restaurant/${r.image}`}
                    alt={r.name}
                    sx={{ height: 160, objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{r.name}</Typography>
                    <Typography variant="body2">📍 {r.city}, {r.country}</Typography>
                    <Typography variant="body2">📞 {r.phoneNumber}</Typography>
                    <Typography variant="body2">🍛 Meals: {r.meals}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(r)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(r.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          {Math.ceil(restaurants.length / rowsPerPage) > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(restaurants.length / rowsPerPage)}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editRestaurant ? "Edit Restaurant" : "Add Restaurant"}</DialogTitle>
        <DialogContent>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              sx={{ width: "100%", height: 180, objectFit: "cover", mb: 2 }}
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
          )}
          <Button component="label" variant="outlined" fullWidth sx={{ mb: 2 }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={handleImageChange} />
          </Button>
          {Object.entries(initialForm).map(([key]) => {
            if (key === "image") return null;
            return (
              <TextField
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1) + " *"}
                fullWidth
                value={(formData as any)[key]}
                onChange={handleInput}
                sx={{ mb: 2 }}
                error={Boolean(errors[key])}
                helperText={errors[key] || ""}
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
            Are you sure you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

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
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../../api/hotels";

interface Hotel {
  id: string;
  name: string;
  image: string;
  price: number;
  desc: string;
  address: string;
  country: string;
  city: string;
  package: string;
  people: string;
  rooms: string;
}

const initialForm = {
  name: "",
  image: "",
  price: "",
  desc: "",
  address: "",
  country: "",
  city: "",
  package: "",
  people: "",
  rooms: "",
};

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [open, setOpen] = useState(false);
  const [editHotel, setEditHotel] = useState<Hotel | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data } = await getHotels();
      setHotels(data);
    } catch {
      toast.error("Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const paginatedHotels = hotels.slice(
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

    if (editHotel) form.append("ID", editHotel.id);

    if (imageFile) {
      form.append("Image", imageFile);
    } else if (editHotel) {
      form.append("ExistingImage", editHotel.image);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        form.append(
          key.charAt(0).toUpperCase() + key.slice(1),
          value
        );
      }
    });

    try {
      if (editHotel) {
        await updateHotel(form);
        toast.success("Hotel updated successfully");
      } else {
        await addHotel(form);
        toast.success("Hotel added successfully");
      }
      closeDialog();
      fetchHotels();
    } catch {
      toast.error("Something went wrong while saving");
    }
  };

  const handleEdit = (h: Hotel) => {
    setEditHotel(h);
    setFormData({
      name: h.name,
      image: h.image,
      price: h.price.toString(),
      desc: h.desc,
      address: h.address,
      country: h.country,
      city: h.city,
      package: h.package,
      people: h.people,
      rooms: h.rooms,
    });
    setPreviewUrl(
      h.image.startsWith("http")
        ? h.image
        : `https://localhost:7032/Images/Hotel/${h.image}`
    );
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteHotel(deleteId);
      toast.success("Hotel deleted");
      fetchHotels();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const closeDialog = () => {
    setEditHotel(null);
    setFormData({ ...initialForm });
    setImageFile(null);
    setPreviewUrl(null);
    setOpen(false);
    setErrors({});
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🏨 Manage Hotels
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Hotel
      </Button>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {paginatedHotels.map((h) => (
              <Box key={h.id} sx={{ width: { xs: "100%", sm: "48%", md: "31%" }, minWidth: 280 }}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 2, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    src={
                      h.image.startsWith("http")
                        ? h.image
                        : `https://localhost:7032/Images/Hotel/${h.image}`
                    }
                    alt={h.name}
                    sx={{ height: 160, objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{h.name}</Typography>
                    <Typography variant="body2">📍 {h.city}, {h.country}</Typography>
                    <Typography variant="body2">🏷 {h.package}</Typography>
                    <Typography variant="body2">🛏 {h.rooms} rooms · 👥 {h.people} people</Typography>
                    <Typography variant="h6" color="primary" mt={1}>
                      ₹{h.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(h)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(h.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          {Math.ceil(hotels.length / rowsPerPage) > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(hotels.length / rowsPerPage)}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
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
                type={isPrice ? "number" : "text"}
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
            Are you sure you want to delete this hotel?
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

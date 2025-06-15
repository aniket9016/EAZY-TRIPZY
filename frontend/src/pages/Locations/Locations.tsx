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
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} from "../../api/locations";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  latitude: string;
  longitude: string;
}

const initialForm: Omit<Location, "id"> = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zip_code: "",
  latitude: "",
  longitude: "",
};

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const { data } = await getLocations();
      setLocations(data);
    } catch {
      toast.error("Failed to fetch locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const paginatedLocations = locations.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (editLocation) {
        // PATCH includes id both in URL and body as required by your API
        await updateLocation(editLocation.id, { ...formData, id: editLocation.id });
        toast.success("Location updated successfully");
      } else {
        await addLocation(formData);
        toast.success("Location added successfully");
      }
      closeDialog();
      fetchLocations();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Something went wrong while saving");
    }
  };

  const handleEdit = (loc: Location) => {
    setEditLocation(loc);
    setFormData({
      name: loc.name,
      address: loc.address,
      city: loc.city,
      state: loc.state,
      country: loc.country,
      zip_code: loc.zip_code,
      latitude: loc.latitude,
      longitude: loc.longitude,
    });
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteLocation(deleteId);
      toast.success("Location deleted");
      fetchLocations();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const closeDialog = () => {
    setEditLocation(null);
    setFormData({ ...initialForm });
    setOpen(false);
    setErrors({});
  };

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        p: 3,
        borderRadius: 2,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🌍 Manage Locations
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Location
      </Button>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {paginatedLocations.map((loc) => (
              <Box
                key={loc.id}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "31%" },
                  minWidth: 280,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 5,
                    border: "1px solid #e0e0e0",
                    bgcolor: "#fffefa",
                    transition: "all 0.3s ease-in-out",
                    ":hover": {
                      boxShadow: 8,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {loc.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📍 {loc.address}, {loc.city}, {loc.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🌐 {loc.country}, ZIP: {loc.zip_code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🧭 Lat: {loc.latitude}, Long: {loc.longitude}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(loc)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteId(loc.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>

          {Math.ceil(locations.length / rowsPerPage) > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(locations.length / rowsPerPage)}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editLocation ? "Edit Location" : "Add Location"}</DialogTitle>
        <DialogContent>
          {Object.entries(initialForm).map(([key]) => (
            <TextField
              key={key}
              name={key}
              label={
                key
                  .replace(/_/g, " ")
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase()) + " *"
              }
              fullWidth
              sx={{ mb: 2 }}
              value={(formData as any)[key]}
              onChange={handleInput}
              error={Boolean(errors[key])}
              helperText={errors[key] || ""}
            />
          ))}
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
            Are you sure you want to delete this location?
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

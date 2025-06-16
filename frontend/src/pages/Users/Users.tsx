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
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid/models";
import { useEffect, useState } from "react";
import { getApiClient } from "../../utils/api";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", dob: "" });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const api = getApiClient();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/User/GetAllUser");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddDialog = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", dob: "" });
    setOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form };

    try {
      if (editUser) {
        await api.patch(`/User/EditUser/${editUser.id}`, { ...payload, id: editUser.id });
        toast.success("User updated successfully");
      } else {
        await api.post("/User/AddUser", payload);
        toast.success("User added successfully");
      }

      closeDialog();
      fetchUsers();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save user");
    }
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
      dob: user.dob,
    });
    setOpen(true);
  };

  const confirmDelete = (user: User) => {
    setUserToDelete(user);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete?.id) return;
    try {
      await api.delete(`/User/RemoveUser/${userToDelete.id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    } finally {
      setConfirmDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  const closeDialog = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", dob: "" });
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => confirmDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        👥 Manage Users
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={openAddDialog}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>

      <Box sx={{ height: 460, width: "100%", position: "relative" }}>
        {loading ? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            sx={{
              bgcolor: "#fff",
              color: "#333",
              borderRadius: 2,
              boxShadow: 2,
              border: "1px solid #ddd",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f1f1f1",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#fafafa",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #eee",
              },
            }}
          />
        )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="text"
            fullWidth
            sx={{ mb: 2 }}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

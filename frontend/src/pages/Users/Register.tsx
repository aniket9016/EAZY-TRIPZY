import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getApiClient } from "../../utils/api"; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const api = getApiClient();
      await api.post("/Login/Register", {
        name,
        email,
        password,
        dob,
      });
      toast.success("Registered successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 10,
          bgcolor: "#fdfdfd",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Register Admin
        </Typography>

        <TextField
          label="Name"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </Paper>
    </Container>
  );
}

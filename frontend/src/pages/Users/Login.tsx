import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import { getApiClient } from "../../utils/api"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const api = getApiClient(); // ✅ Use token-injected instance
      const res = await api.post("/Login/Login", {
        email,
        passwordHash: password,
      });

      if (res.data?.token) {
        setToken(res.data.token);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 12 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
        </Box>
        <TextField
          label="Email"
          fullWidth
          sx={{ mt: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}

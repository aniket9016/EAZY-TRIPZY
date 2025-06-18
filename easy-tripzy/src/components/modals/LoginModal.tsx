// src/components/LoginModal.tsx
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { getApiClient } from "../../utils/api";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface LoginResponse {
  token: string;
  [key: string]: any;
}

interface JwtPayload {
  name: string;
  email: string;
  exp: number;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [open]);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await getApiClient().post<LoginResponse>("/Login/Login", {
        email,
        passwordHash: password,
      });

      if (res.data?.token) {
        const decoded: JwtPayload = jwtDecode(res.data.token);

        if (decoded?.name) {
          localStorage.setItem("userName", decoded.name);
        }

        if (decoded?.email) {
          localStorage.setItem("userEmail", decoded.email);
        }

        setToken(res.data.token);
        sessionStorage.removeItem("firstLogin");
        toast.success("Login successful!");
        onClose();
      } else {
        toast.error("Login failed. No token received.");
      }
    } catch (error) {
      toast.error("Invalid login credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component={Paper}
        elevation={6}
        sx={{
          width: 400,
          maxWidth: "90vw",
          p: 4,
          mx: "auto",
          my: "10vh",
          borderRadius: 3,
          position: "relative",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Log In
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Log In
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

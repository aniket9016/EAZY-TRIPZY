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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/getApis";
import { getApiClient } from "../../utils/api";
import { toast } from "react-toastify";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  openLogin: () => void;
}

export default function SignupModal({ open, onClose, openLogin }: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setPassword("");
      setDob("");
      setErrors({ name: "", email: "", password: "", dob: "" });
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", dob: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!dob.trim()) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const resUsers = await getUsers();
      const users = resUsers.data as { email: string }[];
      if (users.some((u) => u.email === email)) {
        setErrors((prev) => ({ ...prev, email: "Email is already registered" }));
        return;
      }

      const res = await getApiClient().post("/Login/Register", {
        name,
        email,
        password,
        dob,
      });

      const data = res.data as { token?: string };

      if (data?.token || data) {
        toast.success("Registered successfully, you can now log in");
        onClose();
        openLogin();
      } else {
        toast.error("Signup succeeded but no token returned");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
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
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={Boolean(errors.name)}
          helperText={errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
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
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          margin="normal"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            setErrors((prev) => ({ ...prev, dob: "" }));
          }}
          error={Boolean(errors.dob)}
          helperText={errors.dob}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            max: new Date().toISOString().split("T")[0], // ✅ Blocks future dates
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              background: "linear-gradient(to right, #2196f3, #0d47a1)",
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              py: 1,
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                background: "linear-gradient(to right, #0d47a1, #2196f3)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

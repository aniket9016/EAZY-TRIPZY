import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import { useAuthStore } from "../store/authStore";

export default function Landing() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setLoginOpen(false);
      setSignupOpen(false);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #1976d2, #00bcd4)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <GroupIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Easy Tripzy
        </Typography>
        <Typography variant="h6" gutterBottom>
          Travel The World From Your Screen!
        </Typography>

        <Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {!token ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => setLoginOpen(true)}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={() => setSignupOpen(true)}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<TravelExploreIcon />}
            onClick={() => navigate("/home")}
          >
            Take a tour
          </Button>
        </Box>

        {/* Modals */}
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        <SignupModal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          openLogin={() => setLoginOpen(true)}
        />
      </Container>
    </Box>
  );
}

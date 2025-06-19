import {
  Box,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background:
          "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        color: "#ffffff",
        fontFamily: "Montserrat, sans-serif",
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        marginTop: 0, // Ensure no top margin
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.1)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          py: { xs: 4, md: 6 },
          margin: 0,
          padding: { xs: "32px 16px", md: "48px 16px" }, // Direct padding control
          maxWidth: "100% !important", // Override container max-width
          width: "100%",
        }}
      >
        {/* Main Footer Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1.5fr",
            },
            gap: { xs: 3, md: 4 },
            mb: 4,
          }}
        >
          {/* About Section */}
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#ffffff",
                mb: 2,
                background: "linear-gradient(45deg, #00C9FF, #92FE9D)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Easy Tripzy
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#ffffff",
                lineHeight: 1.6,
                opacity: 0.9,
                maxWidth: "300px",
              }}
            >
              Book flights, hotels, restaurants and cars with ease. We make your
              travel experience smooth, reliable, and unforgettable.
            </Typography>
          </Box>

          {/* Quick Links Section */}
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#ffffff", mb: 2 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/hotels"
                color="inherit"
                underline="hover"
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00C9FF",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <HotelIcon sx={{ fontSize: "1.2rem" }} />
                Hotels
              </Link>
              <Link
                href="/flights"
                color="inherit"
                underline="hover"
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00C9FF",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <FlightIcon sx={{ fontSize: "1.2rem" }} />
                Flights
              </Link>
              <Link
                href="/restaurants"
                color="inherit"
                underline="hover"
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00C9FF",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <RestaurantIcon sx={{ fontSize: "1.2rem" }} />
                Restaurants
              </Link>
              <Link
                href="/cars"
                color="inherit"
                underline="hover"
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00C9FF",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: "1.2rem" }} />
                Cars
              </Link>
            </Box>
          </Box>

          {/* Newsletter + Social Section */}
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#ffffff", mb: 2 }}
            >
              Stay Connected
            </Typography>

            {/* Newsletter */}
            <Typography
              variant="body2"
              sx={{ color: "#ffffff", opacity: 0.9, mb: 2 }}
            >
              Subscribe to get the latest travel deals and updates
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              <TextField
                size="small"
                placeholder="Enter your email"
                variant="outlined"
                sx={{
                  flex: 1,
                  minWidth: "200px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00C9FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00C9FF",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#333",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #00C9FF, #92FE9D)",
                  color: "#000",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0099CC, #7FE87F)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(0, 201, 255, 0.4)",
                  },
                }}
              >
                SUBSCRIBE
              </Button>
            </Box>

            {/* Social Media */}
            <Typography
              variant="body1"
              fontWeight="600"
              gutterBottom
              sx={{ color: "#ffffff", mb: 1.5 }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                color="inherit"
                href="#"
                size="medium"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#3b5998",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 15px rgba(59, 89, 152, 0.4)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                size="medium"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1da1f2",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 15px rgba(29, 161, 242, 0.4)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                size="medium"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e1306c",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 15px rgba(225, 48, 108, 0.4)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                size="medium"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#0077b5",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 15px rgba(0, 119, 181, 0.4)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            my: 3,
            width: "100%",
          }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#ffffff",
            opacity: 0.8,
            fontWeight: 400,
          }}
        >
          © {new Date().getFullYear()} Easy Tripzy. All rights reserved. | Made
          with ❤️ for travelers
        </Typography>
      </Container>
    </Box>
  );
}

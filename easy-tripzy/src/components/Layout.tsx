// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toolbar, Box, Container } from "@mui/material";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Push content below AppBar height */}
      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5", // light background for contrast
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

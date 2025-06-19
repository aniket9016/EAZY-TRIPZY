// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toolbar, Box, Container } from "@mui/material";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      <Navbar />
      <Toolbar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          margin: 0,
          padding: 0,
          marginBottom: 0, // Ensure no bottom margin
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            margin: "0 auto",
            paddingTop: "24px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "0 !important", // Force remove bottom padding
            marginBottom: "0 !important", // Force remove bottom margin
          }}
        >
          <Outlet />
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
}
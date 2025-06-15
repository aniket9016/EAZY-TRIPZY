import { Typography, Box, Paper, Stack } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🌍 Travel Planner Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to the central hub for managing your travel planner platform.
        Use the navigation panel to manage users, monitor activity, and oversee
        trip plans and destinations.
      </Typography>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Paper sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <AirplanemodeActiveIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Trips Managed</Typography>
            <Typography>120+ Itineraries</Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <MapIcon fontSize="large" color="success" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Destinations</Typography>
            <Typography>85 Places</Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <PeopleIcon fontSize="large" color="secondary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Registered Users</Typography>
            <Typography>500+ Explorers</Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

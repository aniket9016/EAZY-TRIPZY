import { Typography, Box, Paper, Stack, Grid, Card, CardContent, Chip, LinearProgress } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export default function Dashboard() {
  const bookingStats = [
    { title: "Flight Bookings", count: "2,450", growth: "+12%", color: "primary" },
    { title: "Hotel Reservations", count: "1,890", growth: "+8%", color: "success" },
    { title: "Car Rentals", count: "1,250", growth: "+15%", color: "warning" },
    { title: "Restaurant Bookings", count: "3,200", growth: "+20%", color: "secondary" }
  ];

  const recentActivities = [
    "New hotel partner added in Goa",
    "Flight booking system updated",
    "500+ users registered this week",
    "Car rental fleet expanded in Mumbai"
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Header Section */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        🌍 Travel Planner Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '800px' }}>
        Welcome to the comprehensive travel management platform. Our all-in-one solution empowers modern travelers 
        with seamless booking experiences for flights, hotels, car rentals, and dining reservations - all managed 
        through this powerful admin interface.
      </Typography>

      {/* Main Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid  >
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <AirplanemodeActiveIcon fontSize="large" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Flight Tickets</Typography>
              <Typography variant="h4">2,450</Typography>
              <Typography variant="caption">Monthly Bookings</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid  >
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <HotelIcon fontSize="large" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hotel Bookings</Typography>
              <Typography variant="h4">1,890</Typography>
              <Typography variant="caption">Active Reservations</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid  >
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <DirectionsCarIcon fontSize="large" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Car Rentals</Typography>
              <Typography variant="h4">1,250</Typography>
              <Typography variant="caption">Vehicles Booked</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid  >
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center", background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <RestaurantIcon fontSize="large" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Dining</Typography>
              <Typography variant="h4">3,200</Typography>
              <Typography variant="caption">Restaurant Bookings</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Platform Benefits Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PhoneAndroidIcon sx={{ mr: 2 }} />
          Why Our Travel Platform Dominates Today's Market
        </Typography>
        
        <Grid container spacing={3}>
          <Grid   >
            <Box>
              <Typography variant="h6" gutterBottom>🚀 All-in-One Booking Solution</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                In today's fast-paced world, travelers demand convenience. Our platform eliminates the hassle of 
                visiting multiple websites by offering flight tickets, hotel reservations, car rentals, and 
                restaurant bookings under one roof.
              </Typography>
              
              <Typography variant="h6" gutterBottom>💡 Smart Travel Assistant</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                AI-powered recommendations suggest the best combinations of flights, accommodations, and local 
                experiences based on user preferences, budget, and travel dates - making trip planning effortless.
              </Typography>
            </Box>
          </Grid>
          
          <Grid   >
            <Box>
              <Typography variant="h6" gutterBottom>📱 Mobile-First Experience</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                With 78% of travel bookings happening on mobile devices, our responsive platform ensures 
                seamless experiences across all devices, enabling last-minute bookings and real-time updates.
              </Typography>
              
              <Typography variant="h6" gutterBottom>🔒 Secure & Reliable</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Advanced encryption, secure payment gateways, and 24/7 customer support ensure user trust 
                and satisfaction - critical factors in today's digital travel ecosystem.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Admin Management Features */}
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3, color: '#1976d2' }}>
          <AdminPanelSettingsIcon sx={{ mr: 2 }} />
          Comprehensive Admin Management System
        </Typography>
        
        <Grid container spacing={3}>
          <Grid   >
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <ConfirmationNumberIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Booking Management Hub
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Centralized control over all booking operations with real-time monitoring and management capabilities.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption">Flight Operations</Typography>
                  <LinearProgress variant="determinate" value={85} sx={{ mb: 1 }} />
                  <Typography variant="caption">Hotel Partnerships</Typography>
                  <LinearProgress variant="determinate" value={92} color="success" sx={{ mb: 1 }} />
                  <Typography variant="caption">Car Fleet Management</Typography>
                  <LinearProgress variant="determinate" value={78} color="warning" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid   >
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Advanced Analytics & Insights
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Data-driven insights help optimize pricing, inventory, and user experience across all services.
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip label="Revenue Tracking" size="small" color="primary" />
                  <Chip label="User Behavior Analysis" size="small" color="secondary" />
                  <Chip label="Booking Trends" size="small" color="success" />
                  <Chip label="Performance Metrics" size="small" color="warning" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Service Categories Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Service Performance Overview
            </Typography>
            <Grid container spacing={2}>
              {bookingStats.map((stat, index) => (
                <Grid key={index}>
                  <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Typography variant="h5" color={stat.color}>{stat.count}</Typography>
                    <Typography variant="body2">{stat.title}</Typography>
                    <Typography variant="caption" color="success.main">{stat.growth}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        <Grid >
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Recent Platform Activity
            </Typography>
            <Stack spacing={1}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1, fontSize: '0.875rem' }}>
                  • {activity}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Platform Statistics */}
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Paper elevation={2} sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <MapIcon fontSize="large" color="success" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Global Destinations</Typography>
            <Typography color="text.secondary">850+ Cities Covered</Typography>
            <Typography variant="caption">Across 45+ Countries</Typography>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <PeopleIcon fontSize="large" color="secondary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Active User Base</Typography>
            <Typography color="text.secondary">50,000+ Travelers</Typography>
            <Typography variant="caption">Growing 25% Monthly</Typography>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, flex: 1, display: "flex", alignItems: "center" }}>
          <TrendingUpIcon fontSize="large" color="warning" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6">Revenue Growth</Typography>
            <Typography color="text.secondary">₹2.5Cr+ Monthly</Typography>
            <Typography variant="caption">+35% YoY Growth</Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
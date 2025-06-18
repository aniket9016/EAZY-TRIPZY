import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HotelIcon from "@mui/icons-material/Hotel";

const Home = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {/* Restaurants */}
        <Card>
          <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <RestaurantIcon />
              <Box>
                <Typography variant="h6">Restaurants</Typography>
                <Typography>Discover a Wonderful Mix of Cuisines !</Typography>
              </Box>
            </Box>
            <Button variant="contained" color="warning">Discover More</Button>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card>
          <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsRunIcon />
              <Box>
                <Typography variant="h6">Activities</Typography>
                <Typography>Discover Our Collection Of Activities !</Typography>
              </Box>
            </Box>
            <Button variant="contained" color="warning">Discover More</Button>
          </CardContent>
        </Card>

        {/* Hotels */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={2}>
                <HotelIcon />
                <Box>
                  <Typography variant="h6">Hotels</Typography>
                  <Typography>Discover Our Collection Of Hotel Stay Offers !</Typography>
                </Box>
              </Box>
              <Button variant="contained" color="warning">Discover More</Button>
            </Box>
            
            {/* Hotel cards */}
            <Box 
              sx={{ 
                display: "flex", 
                gap: 2, 
                mt: 2,
                flexWrap: "wrap",
                "& > *": { flex: "1 1 300px" }
              }}
            >
              {["X", "Y", "W"].map((label, i) => (
                <Card key={i}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://source.unsplash.com/random/800x60${i}?hotel`}
                    alt={`Hotel ${label}`}
                  />
                  <CardContent>
                    <Typography>Hotel {label}</Typography>
                    <Typography>$100</Typography>
                    <Typography>City {i + 1}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Home;
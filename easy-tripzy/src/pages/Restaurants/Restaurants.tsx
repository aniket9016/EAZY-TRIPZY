// src/pages/Restaurants/Restaurants.tsx
import { useEffect, useState, type JSX } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Pagination,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestauarantIcon from "@mui/icons-material/DinnerDining";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getRestaurants } from "../../api/getApis";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  id: string;
  name: string;
  desc: string;
  phone: string;
  country: string;
  city: string;
  image: string;
  foodType: string;
}

const iconMap: Record<string, JSX.Element> = {
  country: <PublicIcon fontSize="small" />,
  city: <LocationCityIcon fontSize="small" />,
  name: <StorefrontIcon fontSize="small" />,
};

export default function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filtered, setFiltered] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState({ country: "", city: "", name: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchWithDelay = async () => {
      setLoading(true);
      const delay = new Promise((res) => setTimeout(res, 2000));
      const data = getRestaurants().then((res) => res.data as Restaurant[]);
      const [_, restaurants] = await Promise.all([delay, data]);
      setRestaurants(restaurants);
      setFiltered(restaurants);
      setLoading(false);
    };
    fetchWithDelay();
  }, []);

  useEffect(() => {
    const { country, city, name } = filters;
    const filteredList = restaurants.filter((r) => {
      return (
        r.country.toLowerCase().includes(country.toLowerCase()) &&
        r.city.toLowerCase().includes(city.toLowerCase()) &&
        r.name.toLowerCase().includes(name.toLowerCase())
      );
    });
    setFiltered(filteredList);
    setPage(1);
  }, [filters, restaurants]);

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const handleReset = () => setFilters({ country: "", city: "", name: "" });

  return (
    <Box sx={{ mt: 2, pb: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        textAlign="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <RestauarantIcon color="primary" /> Restaurant Offers
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Restaurant Cards */}
        <Box sx={{ flex: 2, order: { xs: 1, md: 0 } }}>
          {loading ? (
            Array.from({ length: rowsPerPage }).map((_, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 8,
                  backgroundColor: "#fefefe",
                }}
              >
                <Skeleton variant="rectangular" width={200} height={200} />
                <CardContent sx={{ flex: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="80%" />
                  <Skeleton width="90%" />
                  <Skeleton width="30%" />
                </CardContent>
              </Card>
            ))
          ) : paginated.length > 0 ? (
            paginated.map((r) => (
              <Card
                key={r.id}
                sx={{
                  display: "flex",
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 8,
                  backgroundColor: { xs: "#f9f9f9", md: "#f9f9ff" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200, height: 200, objectFit: "cover" }}
                  image={
                    r.image
                      ? `https://localhost:7032/Images/Restaurant/${r.image}`
                      : "/no-image.png"
                  }
                  alt={r.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/no-image.png";
                  }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {r.name}
                    </Typography>
                    <Typography color="text.secondary" fontStyle="italic">
                      {r.foodType}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                      color="text.secondary"
                    >
                      <RoomIcon fontSize="small" /> {r.city}, {r.country}
                    </Typography>
                    <Typography sx={{ my: 1 }} color="text.secondary">
                      {r.desc}
                    </Typography>
                    <Typography color="text.secondary">{r.phone}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        navigate("/restaurant-detail", { state: r })
                      }
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No restaurants found.</Typography>
          )}

          {!loading && Math.ceil(filtered.length / rowsPerPage) > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(filtered.length / rowsPerPage)}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
              />
            </Box>
          )}
        </Box>

        {/* Filters */}
        <Box sx={{ flex: 1, order: { xs: 0, md: 1 } }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 8,
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FilterAltIcon /> Filters
            </Typography>

            {["country", "city", "name"].map((field) => (
              <TextField
                key={field}
                label={`Filter by ${field}`}
                fullWidth
                size="small"
                value={filters[field as keyof typeof filters]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {iconMap[field]}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            ))}

            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RestartAltIcon />}
              sx={{
                mt: 1,
                borderColor: "black",
                color: "black",
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Reset Filters
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

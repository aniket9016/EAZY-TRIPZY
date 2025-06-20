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
import FlightIcon from "@mui/icons-material/Flight";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RoomIcon from "@mui/icons-material/Room";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../../api/getApis";

interface Flight {
  id: string;
  name: string;
  departingDate: string;
  departingTime: string;
  departingCountry: string;
  departingCity: string;
  destinationCountry: string;
  destinationCity: string;
  type: string;
  price: number;
  image: string;
}

const iconMap: Record<string, JSX.Element> = {
  name: <FlightIcon fontSize="small" />,
  departingCountry: <PublicIcon fontSize="small" />,
  departingCity: <LocationCityIcon fontSize="small" />,
  destinationCountry: <PublicIcon fontSize="small" />,
  destinationCity: <LocationCityIcon fontSize="small" />,
};

export default function Flights(): JSX.Element {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filtered, setFiltered] = useState<Flight[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    departingCountry: "",
    departingCity: "",
    destinationCountry: "",
    destinationCity: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchWithDelay = async () => {
      setLoading(true);
      const delay = new Promise((res) => setTimeout(res, 2000));
      const data = getFlights().then((res) => res.data as Flight[]);
      const [_, result] = await Promise.all([delay, data]);
      setFlights(result);
      setFiltered(result);
      setLoading(false);
    };
    fetchWithDelay();
  }, []);

  useEffect(() => {
    const filteredList = flights.filter((f) =>
      f.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      f.departingCountry.toLowerCase().includes(filters.departingCountry.toLowerCase()) &&
      f.departingCity.toLowerCase().includes(filters.departingCity.toLowerCase()) &&
      f.destinationCountry.toLowerCase().includes(filters.destinationCountry.toLowerCase()) &&
      f.destinationCity.toLowerCase().includes(filters.destinationCity.toLowerCase())
    );
    setFiltered(filteredList);
    setPage(1);
  }, [filters, flights]);

  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const handleReset = () =>
    setFilters({
      name: "",
      departingCountry: "",
      departingCity: "",
      destinationCountry: "",
      destinationCity: "",
    });

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
        <FlightIcon color="primary" /> Flight Offers
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <Box sx={{ flex: 2, order: { xs: 1, md: 0 } }}>
          {loading ? (
            Array.from({ length: rowsPerPage }).map((_, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  height: { xs: "auto", sm: 200 },
                  flexDirection: { xs: "column", sm: "row" },
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 8,
                  backgroundColor: "#fefefe",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height="100%"
                  sx={{ flexShrink: 0 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="80%" />
                  <Skeleton width="30%" />
                </CardContent>
              </Card>
            ))
          ) : paginated.length > 0 ? (
            paginated.map((f) => (
              <Card
                key={f.id}
                sx={{
                  display: "flex",
                  height: { xs: "auto", sm: 200 },
                  flexDirection: { xs: "column", sm: "row" },
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: 8,
                  backgroundColor: { xs: "#f9f9f9", md: "#f9f9ff" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: 200, sm: "100%" },
                    objectFit: "cover",
                    borderRadius: { xs: "12px 12px 0 0", sm: "12px 0 0 12px" },
                    flexShrink: 0,
                  }}
                  image={
                    f.image
                      ? `https://localhost:7032/Images/Flight/${f.image}`
                      : "/no-image.png"
                  }
                  alt={f.name}
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
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      color="text.primary"
                    >
                      <FlightIcon fontSize="small" /> {f.name}
                    </Typography>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                        color: "#444",
                        fontWeight: 500,
                      }}
                    >
                      <RoomIcon fontSize="small" /> {f.departingCity}, {f.departingCountry} →{" "}
                      {f.destinationCity}, {f.destinationCountry}
                    </Typography>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        my: 1,
                        color: "#555",
                      }}
                    >
                      <InfoIcon fontSize="small" />
                      {f.type} - {new Date(f.departingDate).toLocaleDateString()} at{" "}
                      {f.departingTime}
                    </Typography>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#222",
                        fontWeight: "bold",
                      }}
                    >
                      <AttachMoneyIcon fontSize="small" />
                      ₹{f.price}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate("/flight-detail", { state: f })}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No flights found.</Typography>
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

            {Object.keys(filters).map((field) => (
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

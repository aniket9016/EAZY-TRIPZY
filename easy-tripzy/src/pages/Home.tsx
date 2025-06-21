// src/pages/Home/Home.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Paper,
  Chip,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  DirectionsCar,
  Flight,
  Hotel,
  Restaurant,
  TravelExplore,
  StarRate,
  LocationOn,
  ArrowForward,
  Phone,
  Email,
  Schedule,
  LocalOffer,
  Timer,
  Verified,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCars, getFlights, getHotels, getRestaurants } from "../api/getApis";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  gradient: string;
}

interface FeaturedItem {
  id: string;
  name: string;
  image: string;
  location?: string;
  price?: number;
  rating?: number;
  type: string;
  originalPrice?: number;
  discount?: number;
  offer?: string;
  // Original database properties for proper navigation
  desc?: string;
  country?: string;
  city?: string;
  seatingCapacity?: string;
  address?: string;
  package?: string;
  people?: string;
  rooms?: string;
  phoneNumber?: string;
  meals?: string;
  departingDate?: string;
  returningDate?: string;
  departingTime?: string;
  returningTime?: string;
  departingCountry?: string;
  departingCity?: string;
  destinationCountry?: string;
  destinationCity?: string;
  combinedDepLocation?: string;
  combinedDestination?: string;
  returnDepartingTime?: string;
  returnArrivingTime?: string;
  flightType?: string;
}

interface OfferCard {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  color: string;
  type: string;
}

// Fixed dimensions for consistency
const CARD_DIMENSIONS = {
  width: 320,
  height: 420,
  imageHeight: 200,
  contentHeight: 220,
};

// Fixed dimensions for offer cards
const OFFER_CARD_DIMENSIONS = {
  height: 320,
};

const services: ServiceCard[] = [
  {
    title: "Car Rentals",
    description:
      "Choose from our wide selection of premium vehicles for your journey",
    icon: <DirectionsCar sx={{ fontSize: 40 }} />,
    color: "#FF6B6B",
    route: "/cars",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
  },
  {
    title: "Flight Bookings",
    description: "Find the best flight deals to destinations worldwide",
    icon: <Flight sx={{ fontSize: 40 }} />,
    color: "#4ECDC4",
    route: "/flights",
    gradient: "linear-gradient(135deg, #4ECDC4 0%, #7FDBDA 100%)",
  },
  {
    title: "Hotel Stays",
    description: "Book comfortable accommodations at competitive prices",
    icon: <Hotel sx={{ fontSize: 40 }} />,
    color: "#45B7D1",
    route: "/hotels",
    gradient: "linear-gradient(135deg, #45B7D1 0%, #7BC8E2 100%)",
  },
  {
    title: "Dining Experiences",
    description: "Discover and reserve tables at the finest restaurants",
    icon: <Restaurant sx={{ fontSize: 40 }} />,
    color: "#96CEB4",
    route: "/restaurants",
    gradient: "linear-gradient(135deg, #96CEB4 0%, #B5DDCC 100%)",
  },
];

// Sample offers data
const offers: OfferCard[] = [
  {
    id: "1",
    title: "Summer Car Deals",
    description:
      "Get amazing discounts on luxury car rentals for your summer vacation",
    discount: "30% OFF",
    validUntil: "July 31, 2025",
    image: "/api/placeholder/300/200",
    color: "#FF6B6B",
    type: "car",
  },
  {
    id: "2",
    title: "Flight Flash Sale",
    description:
      "Limited time offer on international flights to popular destinations",
    discount: "₹5000 OFF",
    validUntil: "June 30, 2025",
    image: "/api/placeholder/300/200",
    color: "#4ECDC4",
    type: "flight",
  },
  {
    id: "3",
    title: "Hotel Weekend Special",
    description: "Book 2 nights and get 1 night free at premium hotels",
    discount: "Buy 2 Get 1 FREE",
    validUntil: "August 15, 2025",
    image: "/api/placeholder/300/200",
    color: "#45B7D1",
    type: "hotel",
  },
  {
    id: "4",
    title: "Dining Delights",
    description: "Exclusive restaurant bookings with complimentary appetizers",
    discount: "Free Appetizer",
    validUntil: "July 15, 2025",
    image: "/api/placeholder/300/200",
    color: "#96CEB4",
    type: "restaurant",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    cars: 0,
    flights: 0,
    hotels: 0,
    restaurants: 0,
  });

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      setLoading(true);
      try {
        const [carsRes, flightsRes, hotelsRes, restaurantsRes] =
          await Promise.all([
            getCars(),
            getFlights(),
            getHotels(),
            getRestaurants(),
          ]);

        // Type assertions to avoid 'unknown' errors
        const carsData = carsRes.data as any[];
        const flightsData = flightsRes.data as any[];
        const hotelsData = hotelsRes.data as any[];
        const restaurantsData = restaurantsRes.data as any[];

        // Generate random offers for featured items
        const generateOffer = () => {
          const discounts = [10, 15, 20, 25, 30];
          const offers = [
            "Early Bird Special",
            "Limited Time",
            "Weekend Deal",
            "Summer Sale",
          ];
          const discount =
            discounts[Math.floor(Math.random() * discounts.length)];
          return {
            discount,
            offer: offers[Math.floor(Math.random() * offers.length)],
          };
        };

        const cars = carsData.slice(0, 2).map((car: any) => {
          const { discount, offer } = generateOffer();
          const actualPrice = car.price; // This is the real price from database
          const fakeOriginalPrice = Math.round(
            actualPrice * (1 + discount / 100)
          ); // Create higher "original" price

          return {
            // Keep all original properties for proper navigation
            id: car.id,
            name: car.name,
            desc: car.desc,
            price: actualPrice, // Show real price as discounted price
            country: car.country,
            city: car.city,
            seatingCapacity: car.seatingCapacity,
            image: car.image
              ? `https://localhost:7032/Images/Car/${car.image}`
              : "/no-image.png",
            // Display properties
            location: `${car.city}, ${car.country}`,
            originalPrice: fakeOriginalPrice, // Show fake higher original price
            discount,
            offer,
            rating: 4.5,
            type: "car",
          };
        });

        const flights = flightsData.slice(0, 2).map((flight: any) => {
          const { discount, offer } = generateOffer();
          const actualPrice = flight.price; // This is the real price from database
          const fakeOriginalPrice = Math.round(
            actualPrice * (1 + discount / 100)
          ); // Create higher "original" price

          return {
            // Keep all original properties for proper navigation
            id: flight.id,
            name: flight.name,
            price: actualPrice, // Show real price as discounted price
            departingDate: flight.departingDate,
            returningDate: flight.returningDate,
            departingTime: flight.departingTime,
            returningTime: flight.returningTime,
            departingCountry: flight.departingCountry,
            departingCity: flight.departingCity,
            destinationCountry: flight.destinationCountry,
            destinationCity: flight.destinationCity,
            combinedDepLocation: flight.combinedDepLocation,
            combinedDestination: flight.combinedDestination,
            returnDepartingTime: flight.returnDepartingTime,
            returnArrivingTime: flight.returnArrivingTime,
            flightType: flight.type,
            image: flight.image
              ? `https://localhost:7032/Images/Flight/${flight.image}`
              : "/no-image.png",
            // Display properties
            location: `${flight.departingCity} → ${flight.destinationCity}`,
            originalPrice: fakeOriginalPrice, // Show fake higher original price
            discount,
            offer,
            rating: 4.3,
            type: "flight",
          };
        });

        const hotels = hotelsData.slice(0, 2).map((hotel: any) => {
          const { discount, offer } = generateOffer();
          const actualPrice = hotel.price; // This is the real price from database
          const fakeOriginalPrice = Math.round(
            actualPrice * (1 + discount / 100)
          ); // Create higher "original" price

          return {
            // Keep all original properties for proper navigation
            id: hotel.id,
            name: hotel.name,
            desc: hotel.desc,
            address: hotel.address,
            country: hotel.country,
            city: hotel.city,
            price: actualPrice, // Show real price as discounted price
            package: hotel.package,
            people: hotel.people,
            rooms: hotel.rooms,
            image: hotel.image
              ? `https://localhost:7032/Images/Hotel/${hotel.image}`
              : "/no-image.png",
            // Display properties
            location: `${hotel.city}, ${hotel.country}`,
            originalPrice: fakeOriginalPrice, // Show fake higher original price
            discount,
            offer,
            rating: 4.7,
            type: "hotel",
          };
        });

        const restaurants = restaurantsData
          .slice(0, 2)
          .map((restaurant: any) => {
            const { discount, offer } = generateOffer();

            return {
              // Keep all original properties for proper navigation
              id: restaurant.id,
              name: restaurant.name,
              desc: restaurant.desc,
              address: restaurant.address,
              country: restaurant.country,
              city: restaurant.city,
              phoneNumber: restaurant.phoneNumber,
              meals: restaurant.meals,
              image: restaurant.image
                ? `https://localhost:7032/Images/Restaurant/${restaurant.image}`
                : "/no-image.png",
              // Display properties
              location: `${restaurant.city}, ${restaurant.country}`,
              discount,
              offer,
              rating: 4.6,
              type: "restaurant",
            };
          });

        setFeaturedItems([...cars, ...flights, ...hotels, ...restaurants]);
        setStats({
          cars: carsData.length,
          flights: flightsData.length,
          hotels: hotelsData.length,
          restaurants: restaurantsData.length,
        });
      } catch (error) {
        console.error("Error fetching featured items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  const handleFeaturedItemClick = (item: FeaturedItem) => {
    const routeMap = {
      car: "/car-detail",
      flight: "/flight-detail",
      hotel: "/hotel-detail",
      restaurant: "/restaurant-detail",
    };

    // Create proper navigation data based on item type
    let navigationData: any = {};

    switch (item.type) {
      case "car":
        navigationData = {
          id: item.id,
          name: item.name,
          desc: item.desc || "",
          country: item.country || "",
          city: item.city || "",
          price: item.price?.toString() || "0", // Use actual price (not fake original)
          seatingCapacity: item.seatingCapacity || "",
          image: item.image?.split("/").pop() || "", // Just the filename
        };
        break;

      case "flight":
        navigationData = {
          id: item.id,
          name: item.name,
          departingDate: item.departingDate || "",
          returningDate: item.returningDate || "",
          departingTime: item.departingTime || "",
          returningTime: item.returningTime || "",
          departingCountry: item.departingCountry || "",
          departingCity: item.departingCity || "",
          destinationCountry: item.destinationCountry || "",
          destinationCity: item.destinationCity || "",
          combinedDepLocation: item.combinedDepLocation || "",
          combinedDestination: item.combinedDestination || "",
          returnDepartingTime: item.returnDepartingTime || "",
          returnArrivingTime: item.returnArrivingTime || "",
          type: item.flightType || "",
          price: item.price?.toString() || "0", // Use actual price (not fake original)
          image: item.image?.split("/").pop() || "",
        };
        break;

      case "hotel":
        navigationData = {
          id: item.id,
          name: item.name,
          desc: item.desc || "",
          address: item.address || "",
          country: item.country || "",
          city: item.city || "",
          price: item.price?.toString() || "0", // Use actual price (not fake original)
          package: item.package || "",
          people: item.people || "",
          rooms: item.rooms || "",
          image: item.image?.split("/").pop() || "",
        };
        break;

      case "restaurant":
        navigationData = {
          id: item.id,
          name: item.name,
          desc: item.desc || "",
          address: item.address || "",
          country: item.country || "",
          city: item.city || "",
          phoneNumber: item.phoneNumber || "",
          meals: item.meals || "",
          image: item.image?.split("/").pop() || "",
        };
        break;

      default:
        navigationData = item;
    }

    navigate(routeMap[item.type as keyof typeof routeMap], {
      state: navigationData,
    });
  };

  const OfferCard = ({ offer }: { offer: OfferCard }) => (
    <Grid>
      <Card
        sx={{
          height: OFFER_CARD_DIMENSIONS.height,
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderRadius: 3,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${offer.color}20, ${offer.color}10)`,
          border: `2px solid ${offer.color}30`,
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 15px 30px ${offer.color}20`,
          },
        }}
        onClick={() => navigate(`/${offer.type}s`)}
      >
        <CardContent
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                backgroundColor: offer.color,
                width: 50,
                height: 50,
                mr: 2,
              }}
            >
              <LocalOffer />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {offer.title}
              </Typography>
              <Chip
                label={offer.discount}
                size="small"
                sx={{
                  backgroundColor: offer.color,
                  color: "white",
                  fontWeight: "bold",
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, flex: 1 }}
          >
            {offer.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Timer fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                Valid until {offer.validUntil}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: offer.color,
                "&:hover": {
                  backgroundColor: offer.color,
                  opacity: 0.8,
                },
              }}
            >
              Claim Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const SkeletonCard = ({ index }: { index: number }) => (
    <Grid key={index}>
      <Card
        sx={{
          width: "100%",
          height: CARD_DIMENSIONS.height,
          borderRadius: 3,
        }}
      >
        <Skeleton variant="rectangular" height={CARD_DIMENSIONS.imageHeight} />
        <CardContent sx={{ height: CARD_DIMENSIONS.contentHeight }}>
          <Skeleton width="60%" height={24} />
          <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
          <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Skeleton width="30%" height={24} />
            <Skeleton width="25%" height={20} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: { xs: "center center", md: "center" },
          backgroundRepeat: "no-repeat",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          color: "white",
          height: "80vh",
          minHeight: "510px",
          maxHeight: "60vh",
          width: "100%",
          textAlign: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          // Dark overlay for better text readability
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            py: { xs: 4, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={2}
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
              textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
              lineHeight: 1.2,
            }}
          >
            Your Journey Starts Here
          </Typography>
          <Typography
            variant="h5"
            mb={4}
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.8rem" },
              opacity: 0.95,
              maxWidth: "700px",
              margin: "0 auto 3rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              lineHeight: 1.4,
            }}
          >
            Discover amazing destinations, book comfortable stays, and create
            unforgettable memories with exclusive offers
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<TravelExplore />}
            onClick={() => navigate("/cars")}
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(15px)",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "white",
              px: { xs: 3, md: 5 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: "600",
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              },
            }}
          >
            Start Exploring
          </Button>
        </Container>
      </Box>

      {/* Exclusive Offers Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              mb={2}
              color="text.primary"
            >
              🎉 Exclusive Offers
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              maxWidth="600px"
              mx="auto"
            >
              Limited time deals you can't miss! Save big on your next adventure
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {offers.map((offer) => (
              <Grid
                key={offer.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 380,
                    height: 320,
                    display: "flex",
                  }}
                >
                  <OfferCard offer={offer} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                label: "Cars Available",
                value: stats.cars,
                icon: <DirectionsCar />,
                color: "#FF6B6B",
              },
              {
                label: "Flight Routes",
                value: stats.flights,
                icon: <Flight />,
                color: "#4ECDC4",
              },
              {
                label: "Hotels Listed",
                value: stats.hotels,
                icon: <Hotel />,
                color: "#45B7D1",
              },
              {
                label: "Restaurants",
                value: stats.restaurants,
                icon: <Restaurant />,
                color: "#96CEB4",
              },
            ].map((stat, index) => (
              <Grid key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: stat.color,
                      width: 60,
                      height: 60,
                      margin: "0 auto 1rem",
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" fontWeight="bold" color={stat.color}>
                    {loading ? <Skeleton width={40} /> : stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color="text.primary"
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            mb={6}
            maxWidth="600px"
            mx="auto"
          >
            Everything you need for your perfect trip, all in one place
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              maxWidth: "900px",
              mx: "auto",
            }}
          >
            {services.map((service, index) => (
              <Card
                key={index}
                sx={{
                  height: "400px", // FIXED HEIGHT - all cards exactly the same
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => handleServiceClick(service.route)}
              >
                <Box
                  sx={{
                    background: service.gradient,
                    color: "white",
                    p: 3,
                    textAlign: "center",
                    height: "160px", // FIXED HEIGHT - header section
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                  <Typography variant="h6" fontWeight="bold" mt={1}>
                    {service.title}
                  </Typography>
                </Box>

                <CardContent
                  sx={{
                    p: 3,
                    height: "240px", // FIXED HEIGHT - content section
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                    sx={{
                      color: service.color,
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                      mt: "auto",
                    }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Items Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color="text.primary"
          >
            🔥 Featured Deals
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            mb={6}
            maxWidth="600px"
            mx="auto"
          >
            Handpicked recommendations with special discounts for your next
            adventure
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Grid key={index}>
                    <SkeletonCard index={index} />
                  </Grid>
                ))
              : featuredItems.map((item) => (
                  <Grid key={`${item.type}-${item.id}`}>
                    <Card
                      sx={{
                        width: 320,
                        height: 420,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        borderRadius: 3,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        },
                      }}
                      onClick={() => handleFeaturedItemClick(item)}
                    >
                      {/* Offer Badge */}
                      {item.offer && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            zIndex: 2,
                            background:
                              "linear-gradient(45deg, #FF6B6B, #FF8E8E)",
                            color: "white",
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <LocalOffer fontSize="small" />
                          {item.offer}
                        </Box>
                      )}

                      {/* Discount Badge - Only show for items with price */}
                      {item.discount && item.type !== "restaurant" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 2,
                            backgroundColor: "#FF4444",
                            color: "white",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                          }}
                        >
                          {item.discount}% OFF
                        </Box>
                      )}

                      <CardMedia
                        component="img"
                        sx={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                        image={item.image}
                        alt={item.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/no-image.png";
                        }}
                      />
                      <CardContent
                        sx={{
                          p: 2,
                          height: 220,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{
                                fontSize: "1rem",
                                lineHeight: 1.2,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                flex: 1,
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Chip
                              label={item.type}
                              size="small"
                              sx={{
                                ml: 1,
                                backgroundColor:
                                  services.find((s) =>
                                    s.route.includes(item.type)
                                  )?.color || "#ccc",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "0.7rem",
                                height: 24,
                              }}
                            />
                          </Box>
                          {item.location && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mb: 1,
                                fontSize: "0.8rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <LocationOn fontSize="small" />
                              {item.location}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "auto",
                          }}
                        >
                          {/* Only show pricing for non-restaurant items */}
                          {item.type !== "restaurant" ? (
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  color="primary"
                                  fontWeight="bold"
                                  sx={{ fontSize: "0.9rem" }}
                                >
                                  ₹{item.price}
                                  {item.type === "car" && "/day"}
                                  {item.type === "hotel" && "/night"}
                                </Typography>
                                {item.originalPrice && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      textDecoration: "line-through",
                                      color: "text.secondary",
                                      fontSize: "0.75rem",
                                    }}
                                  >
                                    ₹{item.originalPrice}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          ) : (
                            // For restaurants, show special offer text instead of price
                            <Box>
                              <Typography
                                variant="body2"
                                color="primary"
                                fontWeight="bold"
                                sx={{ fontSize: "0.8rem" }}
                              >
                                {item.offer || "Special Offer"}
                              </Typography>
                            </Box>
                          )}
                          {item.rating && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <StarRate
                                fontSize="small"
                                sx={{ color: "#FFD700" }}
                              />
                              <Typography variant="body2" fontWeight="bold">
                                {item.rating}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/cars")}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              View All Cars
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/flights")}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              View All Flights
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/hotels")}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              View All Hotels
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/restaurants")}
            >
              View All Restaurants
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={6}
            color="text.primary"
          >
            Why Choose Us
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <Schedule sx={{ fontSize: 40 }} />,
                title: "24/7 Support",
                description:
                  "Our dedicated team is available round the clock to assist you",
                color: "#FF6B6B",
              },
              {
                icon: <StarRate sx={{ fontSize: 40 }} />,
                title: "Best Prices",
                description:
                  "We guarantee competitive prices with exclusive discounts",
                color: "#4ECDC4",
              },
              {
                icon: <Verified sx={{ fontSize: 40 }} />,
                title: "Trusted Partners",
                description:
                  "We work with verified and reliable service providers worldwide",
                color: "#45B7D1",
              },
            ].map((feature, index) => (
              <Grid key={index}>
                <Box sx={{ textAlign: "center", p: 3 }}>
                  <Avatar
                    sx={{
                      backgroundColor: feature.color,
                      width: 80,
                      height: 80,
                      margin: "0 auto 2rem",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Ready to Start Your Adventure?
          </Typography>
          <Typography variant="h6" mb={4} sx={{ opacity: 0.9 }}>
            Join thousands of satisfied customers who trust us with their travel
            needs and save with our exclusive offers
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              sx={{
                backgroundColor: "white",
                color: "#2c3e50",
                "&:hover": { backgroundColor: "#f8f9fa" },
              }}
            >
              Call Us Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Email />}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Get In Touch
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

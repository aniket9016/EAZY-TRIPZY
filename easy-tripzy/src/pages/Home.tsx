import "./Homepage.css";
import bannerImg from "../assets/hero2.png";
import carImg from "../assets/car.jpg";
import hotelImg from "../assets/hotel.jpg";
import restaurantImg from "../assets/restaurant.jpg";
import flightImg from "../assets/flight.jpg";
import paris from "../assets/paris.jpg";
import tokyo from "../assets/tokyo.jpg";
import newyork from "../assets/newyork.jpg";
import venice from "../assets/venice.jpg";
import dubai from "../assets/dubai.jpg";
import bali from "../assets/bali.png";
import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";


export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name); // 👈 get the name from stored object
    }
  }, []);


 const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    window.location.href = "/";
  };


  const categories = [
    {
      title: "Car Rentals",
      image: carImg,
      price: "From ₹40/day",
      desc: "Explore your destination at your own pace with our budget-friendly car rental options. Ideal for flexible and comfortable travel",
      type: "View Cars",
      route: "/cars",
    },
    {
      title: "Hotel Mariott",
      image: hotelImg,
      price: "From ₹999/night",
      desc: "Stay in luxurious comfort at Hotel Mariott. Enjoy premium amenities, elegant ambiance, and top-tier hospitality for a memorable trip.",
      type: "View Hotels",
      route: "/hotels",
    },
    {
      title: "Da Domenico",
      image: restaurantImg,
      price: "From ₹300",
      desc: "Savor delicious meals at Da Domenico, offering a cozy dining experience with a rich menu of authentic flavors and inviting décor.",
      type: "View Restaurant",
      route: "/restaurants",
    },
    {
      title: "IndiGo Airlines",
      image: flightImg,
      price: "From ₹4500",
      desc: "Fly high with IndiGo Airlines—safe, fast, and efficient air travel connecting you to top destinations with excellent service.",
      type: " View Flight",
      route: "/flights",
    },
  ];

  const destinations = [
    { id: 1, name: "Paris", country: "France", image: paris },
    { id: 2, name: "Tokyo", country: "Japan", image: tokyo },
    { id: 3, name: "New York", country: "USA", image: newyork },
    { id: 4, name: "Venice", country: "Italy", image: venice },
    { id: 5, name: "Dubai", country: "UAE", image: dubai },
    { id: 6, name: "Bali", country: "Indonesia", image: bali },
  ];

  return (
    <div className="homepage">


      <header className="hero-section">
        <img src={bannerImg} alt="Banner" className="banner-img" />
        <div className="overlay">
          <h1 className="hero-title">DISCOVER & BOOK YOUR JOURNEY</h1>
          <p className="hero-subtitle">
            Explore the world with ease through our all-in-one travel platform.  TouristGuide makes your entire trip seamless and unforgettable.
          </p>
         
        </div>
      </header>

      <section className="category-section">
        <h2>
          <span className="highlight">Explore</span> what's interesting
        </h2>
        <p>Ne his postulant posidonium adversarium. Eu mel aliquid delenit.</p>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <div
              className="category-card"
              key={index}
              onClick={() => navigate(cat.route)}
            >
              <img src={cat.image} alt={cat.title} className="icon-img" />
              <h4>{cat.title}</h4>
              <p>{cat.price}</p>
              <p>{cat.desc}</p>
              <div className="type-label">{cat.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Popular Destinations Section --- */}
      <section className="popular-destination-section">
        <div className="popular-header">
          <h2>Popular Destinations</h2>
          <p>Explore our top travel destinations around the world</p>
        </div>

        <div className="popular-grid">
          {destinations.map((place) => (
            <div className="popular-card" key={place.id}>
              <img src={place.image} alt={place.name} />
              <div className="popular-info">
                <h3>{place.name}</h3>
                <p>{place.country}</p>
                <button>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="special-offers-section">
        <div className="special-header">
          <h2>Special Offers & Deals</h2>
          <p>Grab the best deals before they’re gone! Limited-time travel offers.</p>
        </div>

        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-tag">25% OFF</div>
            <img src={hotelImg} alt="Hotel Deal" />
            <div className="offer-content">
              <h3>Hotel Paradise</h3>
              <p>Get 25% off on your first hotel booking</p>
              <button>Book Now</button>
            </div>
          </div>

          <div className="offer-card">
            <div className="offer-tag">₹500 OFF</div>
            <img src={flightImg} alt="Flight Deal" />
            <div className="offer-content">
              <h3>IndiGo Flights</h3>
              <p>Flat ₹500 off on round-trip bookings</p>
              <button>Book Now</button>
            </div>
          </div>

          <div className="offer-card">
            <div className="offer-tag">Combo Deal</div>
            <img src={restaurantImg} alt="Restaurant Deal" />
            <div className="offer-content">
              <h3>Dinner + Cab</h3>
              <p>Book a restaurant and get free cab ride</p>
              <button>Book Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="how-header">
          <h2>How It Works</h2>
          <p>Follow these simple steps to plan your perfect trip</p>
        </div>

        <div className="how-steps">
          <div className="how-step">
            <div className="step-icon">🔍</div>
            <h4>1. Search</h4>
            <p>Explore cars, hotels, flights, and restaurants in your destination.</p>
          </div>
          <div className="how-step">
            <div className="step-icon">📅</div>
            <h4>2. Book</h4>
            <p>Select your preferred options and confirm your booking instantly.</p>
          </div>
          <div className="how-step">
            <div className="step-icon">🎒</div>
            <h4>3. Travel</h4>
            <p>Enjoy a smooth and well-planned travel experience with us.</p>
          </div>
        </div>
      </section>


      


    </div>
  );
}
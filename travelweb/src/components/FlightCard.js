import React, { useEffect, useState } from "react";
import "../styles/FlightCard.css";
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import airIndiaLogo from "../assets/airindia.png";
import spiceJet from "../assets/spicejet.jpeg";
import airAsia from "../assets/airasia.png";
import Indigo from "../assets/indigo.png";
import goAir from "../assets/goair.jpeg";
import Vistara from "../assets/vistara.jpeg";

const FlightCard = () => {
  const [flightData, setFlightData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFlights, setShowAllFlights] = useState(true);  // Toggle state for showing all or filtered flights

  // Dummy local flight data
  const dummyFlights = [
    {
      FlightLogo: airIndiaLogo,
      FlightName: "Air India",
      FlightNumber: "AI202",
      DepartureTime: "10:00 AM",
      DepartureDestination: "Chennai",
      ArrivalTime: "12:30 PM",
      ArrivalDestination: "Delhi",
      TotalTime: "2h 30m",
      FlightPrice: "3200",
    },
    {
      FlightLogo: Indigo,
      FlightName: "IndiGo",
      FlightNumber: "6E302",
      DepartureTime: "1:00 PM",
      DepartureDestination: "Mumbai",
      ArrivalTime: "3:45 PM",
      ArrivalDestination: "Kolkata",
      TotalTime: "2h 45m",
      FlightPrice: "4100",
    },
    {
      FlightLogo: spiceJet,
      FlightName: "SpiceJet",
      FlightNumber: "SG405",
      DepartureTime: "9:15 AM",
      DepartureDestination: "Bangalore",
      ArrivalTime: "11:45 AM",
      ArrivalDestination: "Hyderabad",
      TotalTime: "2h 30m",
      FlightPrice: "2900",
    },
    {
      FlightLogo: spiceJet,
      FlightName: "SpiceJet",
      FlightNumber: "SG405",
      DepartureTime: "9:15 AM",
      DepartureDestination: "Bangalore",
      ArrivalTime: "11:45 AM",
      ArrivalDestination: "Sydney",
      TotalTime: "2h 30m",
      FlightPrice: "2900",
    },
    {
      FlightLogo: spiceJet,
      FlightName: "SpiceJet",
      FlightNumber: "SG405",
      DepartureTime: "9:15 AM",
      DepartureDestination: "Bangalore",
      ArrivalTime: "11:45 AM",
      ArrivalDestination: "Dubai",
      TotalTime: "2h 30m",
      FlightPrice: "2900",
    },
    {
      FlightLogo: Vistara,
      FlightName: "Vistara",
      FlightNumber: "UK801",
      DepartureTime: "3:30 PM",
      DepartureDestination: "Pune",
      ArrivalTime: "6:00 PM",
      ArrivalDestination: "Jaipur",
      TotalTime: "2h 30m",
      FlightPrice: "4500",
    },
    {
      FlightLogo: Vistara,
      FlightName: "Vistara",
      FlightNumber: "UK801",
      DepartureTime: "3:30 PM",
      DepartureDestination: "Pune",
      ArrivalTime: "6:00 PM",
      ArrivalDestination: "Paris",
      TotalTime: "2h 30m",
      FlightPrice: "4500",
    },
    {
      FlightLogo: goAir,
      FlightName: "GoAir",
      FlightNumber: "G8212",
      DepartureTime: "11:00 AM",
      DepartureDestination: "Ahmedabad",
      ArrivalTime: "1:30 PM",
      ArrivalDestination: "Bali",
      TotalTime: "2h 30m",
      FlightPrice: "3300",
    },
    {
      FlightLogo: goAir,
      FlightName: "GoAir",
      FlightNumber: "G8212",
      DepartureTime: "11:00 AM",
      DepartureDestination: "Ahmedabad",
      ArrivalTime: "1:30 PM",
      ArrivalDestination: "Tokyo",
      TotalTime: "2h 30m",
      FlightPrice: "3300",
    },
    {
      FlightLogo: airAsia,
      FlightName: "AirAsia",
      FlightNumber: "I5771",
      DepartureTime: "8:45 AM",
      DepartureDestination: "Cochin",
      ArrivalTime: "11:15 AM",
      ArrivalDestination: "Tokyo",
      TotalTime: "2h 30m",
      FlightPrice: "2700",
    },
  ];

  // Simulate fetching data with useEffect
  useEffect(() => {
    setTimeout(() => {
      setFlightData(dummyFlights);
    }, 500);
  }, []);

  const localData = JSON.parse(localStorage.getItem("selectedPlace")) || {};
  const selectedCountry = localData.placeName || "";

  const handleBookNow = (flight) => {
    const combinedData = { ...localData, ...flight };
    localStorage.setItem("currentData", JSON.stringify(combinedData));
    navigate("/Booking");
  };

  // Search filter logic
  const filteredFlights = flightData.filter(
    (flight) =>
      (flight.DepartureDestination.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        flight.ArrivalDestination.toLowerCase().includes(selectedCountry.toLowerCase())) &&
      (
        flight.FlightName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.FlightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.DepartureDestination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.ArrivalDestination.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const flightsToDisplay = showAllFlights ? flightData : filteredFlights;

  return (
    <div id="flightCardsBody">
      <h1 className="main-heading">Available Flights...</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Flight Name, Number, Departure or Arrival..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Toggle Button */}
      <div className="toggle-buttons">
        <button
          onClick={() => setShowAllFlights(true)}
          className={showAllFlights ? "active" : ""}
        >
          Show All Flights
        </button>
        <button
          onClick={() => setShowAllFlights(false)}
          className={!showAllFlights ? "active" : ""}
        >
          Show Filtered Flights
        </button>
      </div>

      {flightsToDisplay.map((flight, index) => (
        <div key={index} id="FlightContianer">
          {/* Deal Section */}
          <div id="Section1">
            <div id="SectionLeft">
              <span className="deal-tag">DEAL</span>
              <p>
                Independence Day Sale is live, Flat 14% Off on select cards.
                T&Cs apply.
              </p>
            </div>
          </div>

          {/* Flight Details Section */}
          <div className="section section-2">
            <div className="devider devider-1">
              <div className="flight-details">
                <img
                  src={flight.FlightLogo}
                  alt="logo"
                  className="flight-logo"
                />
                <div>
                  <p>{flight.FlightName}</p>
                  <p>{flight.FlightNumber}</p>
                </div>
              </div>

              <div className="time-section">
                <div className="time-box">
                  <p>{flight.DepartureTime}</p>
                  <p>{flight.DepartureDestination}</p>
                </div>
                <div className="line" />
                <div className="time-box">
                  <p>{flight.ArrivalTime}</p>
                  <p>{flight.ArrivalDestination}</p>
                </div>
              </div>
            </div>

            <div className="devider devider-2">
              <div className="total-time">
                <p>{flight.TotalTime}</p>
                <p>Non Stop</p>
              </div>
              <div className="flight-price">
                <p>₹ {flight.FlightPrice}</p>
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(flight)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="section section-3">
            <select>
              <option>Flight Details</option>
            </select>
            <div className="flight-footer">
              <div className="meal-section">
                <ImSpoonKnife />
                <p>Free Meal</p>
              </div>
              <div className="emissions">
                <p>Emissions: 142 Kg CO2</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightCard;

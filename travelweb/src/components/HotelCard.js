import React, { useEffect, useState } from "react";
import "../styles/HotelCard.css";
import { RiStarSFill } from "react-icons/ri";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsCupHotFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Res1 from "../assets/res1.jpeg";
import Res2 from "../assets/res2.jpeg";
import Res3 from "../assets/res3.jpeg";
import Res4 from "../assets/res4.jpeg";
import Res5 from "../assets/res5.jpeg";
import Res22 from "../assets/res2.jpg";

const HotelCard = () => {
  const [hotelData, setHotelData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllHotels, setShowAllHotels] = useState(false); // New state for showing all hotels
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const sampleHotels = [
    {
      HotelName: "Paradise Beach Resort",
      HotelImage: Res1,
      HotelStars: 4,
      HotelRating: 4.5,
      ReviewRating: 120,
      HotelLocation: "Beachside",
      HotelCountry: "Paris",
      HotelDescription: "Enjoy luxury and serenity with a beachfront view.",
      HotelPrice: 1200,
      HotelTax: 20,
    },
    {
      HotelName: "Luxury Beach Resort",
      HotelImage: Res2,
      HotelStars: 4,
      HotelRating: 4.5,
      ReviewRating: 150,
      HotelLocation: "Beachside",
      HotelCountry: "Paris",
      HotelDescription: "Perfect for nature lovers with breathtaking views.",
      HotelPrice: 20000,
      HotelTax: 15,
    },
    {
      HotelName: "Mountain View Inn",
      HotelImage: Res22,
      HotelStars: 5,
      HotelRating: 4.8,
      ReviewRating: 98,
      HotelLocation: "Mountains",
      HotelCountry: "Tokyo",
      HotelDescription: "Perfect for nature lovers with breathtaking views.",
      HotelPrice: 1400,
      HotelTax: 18,
    },
    {
      HotelName: "City Comfort Stay",
      HotelImage: Res3,
      HotelStars: 3,
      HotelRating: 4.0,
      ReviewRating: 200,
      HotelLocation: "Downtown ",
      HotelCountry: "Sydney",
      HotelDescription: "Comfort and convenience in the heart of the city.",
      HotelPrice: 9000,
      HotelTax: 10,
    },
    {
      HotelName: "Rainforest Escape",
      HotelImage: Res4,
      HotelStars: 4,
      HotelRating: 4.3,
      ReviewRating: 150,
      HotelLocation: "abc estates",
      HotelCountry: "Bali",
      HotelDescription: "A tranquil retreat surrounded by lush rainforest.",
      HotelPrice: 1100,
      HotelTax: 12,
    },
    {
      HotelName: "Rainforest Escape",
      HotelImage: Res4,
      HotelStars: 4,
      HotelRating: 4.3,
      ReviewRating: 150,
      HotelLocation: "abc estates",
      HotelCountry: "Tokyo",
      HotelDescription: "A tranquil retreat surrounded by lush rainforest.",
      HotelPrice: 11000,
      HotelTax: 12,
    },
    {
      HotelName: "Desert Oasis Resort",
      HotelImage: Res5,
      HotelStars: 5,
      HotelRating: 4.7,
      ReviewRating: 85,
      HotelLocation: "aaa buildings",
      HotelCountry: "Tokyo",
      HotelDescription: "Luxury stay in the heart of the Thar desert.",
      HotelPrice: 13000,
      HotelTax: 14,
    },
    {
      HotelName: "Desert Oasis Resort",
      HotelImage: Res5,
      HotelStars: 5,
      HotelRating: 4.7,
      ReviewRating: 85,
      HotelLocation: "aaa buildings",
      HotelCountry: "Dubai",
      HotelDescription: "Luxury stay in the heart of the Thar desert.",
      HotelPrice: 10030,
      HotelTax: 14,
    },
  ];

  const selectedPlaceString = localStorage.getItem("selectedPlace");
  let Country = "Unknown";

  if (selectedPlaceString) {
    try {
      const selectedPlace = JSON.parse(selectedPlaceString);
      Country = selectedPlace.placeName || "Unknown";
    } catch (error) {
      console.error("Error parsing selectedPlace:", error);
    }
  }

  useEffect(() => {
    fetch(`${apiUrl}/places`)
      .then((res) => res.json())
      .then((data) => setHotelData(data))
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setHotelData(sampleHotels); // fallback
      });
  }, [apiUrl]);

  const handleBookNow = (hotel) => {
    const hotelDataForBooking = {
      name: hotel.HotelName,
      location: hotel.HotelLocation,
      price: hotel.HotelPrice,
      checkIn: "2025-05-01",
      checkOut: "2025-05-07",
    };

    localStorage.setItem("selectedHotel", JSON.stringify(hotelDataForBooking));
    navigate("/flightcard");
  };

  const countryFilteredHotels = hotelData.filter(
    (hotel) => hotel.HotelCountry?.toLowerCase() === Country.toLowerCase()
  );

  const filteredHotels = countryFilteredHotels.filter((hotel) =>
    hotel.HotelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allHotels = showAllHotels ? hotelData : filteredHotels;

  return (
    <div id="HotelCardBody">
      {/* Header with Search Bar */}
      <div id="HotelCardHeader">
  <h1 id="HotelHeading">Available Hotels 🏨</h1>
  <div id="SearchBarWrapper">
    <FaSearch id="SearchIcon" />
    <input
      id="search-bar"
      type="text"
      placeholder="Search by hotel name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  {/* Button to Show All Hotels */}
  <button
    id="showAllButton"
    onClick={() => setShowAllHotels(!showAllHotels)} // Toggle showAllHotels state
  >
    {showAllHotels ? "Show Filtered Hotels" : "Show All Hotels"} {/* Toggle button text */}
  </button>
</div>


      {allHotels.length > 0 ? (
        allHotels.map((hotel, index) => {
          const starIcons = Array(hotel.HotelStars)
            .fill()
            .map((_, i) => <RiStarSFill key={i} />);

          return (
            <div key={index} id="HotelContainer">
              <div id="LeftHotelBox">
                <img src={hotel.HotelImage} alt={`${hotel.HotelName}`} />
              </div>

              <div id="MiddleHotelBox">
                <div id="MiddleHotelBoxTop">
                  <div id="HotelRatings">
                    <div id="HotelStars">
                      <div id="star">{starIcons}</div>
                      <span className="resort-tag">RESORT</span>
                    </div>
                    <div id="HotelRatingTag">
                      <span className="rating-button">{hotel.HotelRating}</span>
                      <p>{hotel.ReviewRating} Ratings</p>
                    </div>
                  </div>

                  <div id="HotelName">
                    <p>{hotel.HotelName}</p>
                  </div>
                  <div id="HotelLocation">
                    <FaMapMarkerAlt />
                    <p>{hotel.HotelLocation}</p>
                  </div>
                </div>

                <div id="MiddleHotelBoxBtm">
                  <div id="HotelMiddleBtmSection">
                    <p>{hotel.HotelDescription}</p>
                  </div>
                </div>
              </div>

              <div id="RightHotelBox">
                <p id="HotelPrice">₹ {hotel.HotelPrice}</p>
                <p>+ ₹ {hotel.HotelTax} TAXES & FEES</p>
                <p>1 room per night</p>
                <div id="BreakFastSection">
                  <BsCupHotFill />
                  <p>INCL OF FREE BREAKFAST</p>
                </div>
                <button
                  className="book-now-btn"
                  onClick={() => handleBookNow(hotel)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No hotels found for {Country}.</p>
      )}
    </div>
  );
};

export default HotelCard;

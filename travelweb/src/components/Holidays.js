import React, { useEffect, useState } from "react";
import "../styles/Holidays.css";
import { Link, useNavigate } from "react-router-dom";
import Paris from "../assets/paris.jpeg";
import Bali from "../assets/bali.jpeg";
import NewYork from "../assets/newyork.jpeg";
import Tokyo from "../assets/tokyo.jpeg";
import Sydney from "../assets/sydney.jpeg";
import Rome from "../assets/rome.jpeg";
import Dubai from "../assets/dubai.jpeg";


const Holidays = () => {
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const places = [
      {
        placeName: "Paris",
        imageURL: Paris,
        tripDuration: "5 days",
        price: 5000,
      },
      {
        placeName: "Bali",
        imageURL: Bali,
        tripDuration: "7 days",
        price: 1100,
      },
      {
        placeName: "New York",
        imageURL: NewYork,
        tripDuration: "4 days",
        price: 10000,
      },
      {
        placeName: "Tokyo",
        imageURL: Tokyo, // Add an actual image URL or path
        tripDuration: "6 days",
        price: 8000,
      },
      {
        placeName: "Sydney",
        imageURL: Sydney, // Add an actual image URL or path
        tripDuration: "8 days",
        price: 9000,
      },
      {
        placeName: "Rome",
        imageURL: Rome, // Add an actual image URL or path
        tripDuration: "5 days",
        price: 6500,
      },
      {
        placeName: "Dubai",
        imageURL: Dubai, // Add an actual image URL or path
        tripDuration: "4 days",
        price: 7500,
      },
    ];
    setLoading(false);
    setPlacesData(places);
  }, []);

const handleBook = (place) => {
  localStorage.setItem("selectedPlace", JSON.stringify(place)); // save full place details
  navigate("/HotelCard");
};


  return (
    <div id="holidays">
      <div id="text">
        <h1>Find Popular Destinations</h1>
        <div className="desc">
          <p>
            Escape the ordinary and explore the extraordinary - with our
            handpicked selection of destinations and travel details. You will
            be able to create the trip of your dreams.
          </p>
        </div>
        
      </div>

      <div id="holidaysContainer">
        {placesData.map((place) => (
          <div className="box" key={place.placeName}>
            <div className="holidayImage">
              <img src={place.imageURL} alt={place.placeName} />
            </div>
            <div className="content">
              <h2>{place.placeName}</h2>
              <h3>{place.tripDuration}</h3>
              <div className="bookingBox">
                <div className="priceBox">
                  <span id="starts">Starts from</span>
                  <span id="price">₹{place.price} / person</span>
                </div>
                <button
                  id="btn"
                  onClick={() => handleBook(place)}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidays;

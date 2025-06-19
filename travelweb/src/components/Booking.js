import React, { useState, useEffect } from "react";
import "../styles/Booking.css"; 
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [bookingName, setBookingName] = useState("");
  const [bookingAge, setBookingAge] = useState("");
  const [bookingGender, setBookingGender] = useState("");
  const [address, setAddress] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [tripDays, setTripDays] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState({});
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedHoliday, setSelectedHoliday] = useState({});
  const [passengerDetails, setPassengerDetails] = useState([{ name: "", age: "", gender: "" }]);
  const navigate = useNavigate();

  useEffect(() => {
    const flightData = JSON.parse(localStorage.getItem("currentData")) || {};
    setSelectedFlight(flightData);
    console.log("Flight data:", flightData);

    const hotelData = JSON.parse(localStorage.getItem("selectedHotel")) || {};
    setSelectedHotel(hotelData);
    console.log("Hotel data:", hotelData);

    const holidayData = JSON.parse(localStorage.getItem("selectedPlace")) || {};
    setSelectedHoliday(holidayData);
    console.log("Holiday data from localStorage:", holidayData);

    // Save the logged-in user id if not already present
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && !localStorage.getItem("loggedInUserId")) {
      localStorage.setItem("loggedInUserId", loggedInUser.id);
      console.log("Saved loggedInUserId:", loggedInUser.id);
    }
  }, []);

  const handleIncrement = () => {
    setNumTickets(numTickets + 1);
    setPassengerDetails([...passengerDetails, { name: "", age: "", gender: "" }]);
  };

  const handleDecrement = () => {
    if (numTickets > 1) {
      setNumTickets(numTickets - 1);
      setPassengerDetails(passengerDetails.slice(0, -1));
    }
  };

  const handlePassengerChange = (index, e) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][e.target.name] = e.target.value;
    setPassengerDetails(updatedPassengers);
  };

  const storeBooking = (bookingData) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (!loggedInUserId) {
      console.error("User not logged in. Booking not stored.");
      return;
    }

    // Create a new booking with the logged-in userId
    const newBooking = { ...bookingData, userId: loggedInUserId };

    // Fetch existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    existingBookings.push(newBooking);

    // Store the updated bookings in localStorage
    localStorage.setItem("userBookings", JSON.stringify(existingBookings));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      bookingName,
      bookingAge,
      bookingGender,
      address,
      adharNumber,
      numTickets,
      tripDays,
      passengerDetails,
      flightDetails: selectedFlight,
      hotelDetails: selectedHotel,
      holidayDetails: selectedHoliday,
    };

    // Save the booking data and log it
    console.log("Submitted Payload:", payload);
    storeBooking(payload); // Save booking in userBookings

    navigate("/FinalPayment"); // Navigate to the Final Payment page
  };

  return (
    <div id="BookingBody">
      <div id="BookingContainer">
        <form onSubmit={handleSubmit}>
          <h2 id="bookingForm">Booking Form</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={bookingName}
            onChange={(e) => setBookingName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={bookingAge}
            onChange={(e) => setBookingAge(e.target.value)}
            required
          />

          <select
            value={bookingGender}
            onChange={(e) => setBookingGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>

          <input
            type="number"
            placeholder="Aadhar Card Number"
            value={adharNumber}
            onChange={(e) => setAdharNumber(e.target.value)}
            required
          />

          <label>Number of Tickets:</label>
          <div className="ticket-counter">
            <button type="button" onClick={handleDecrement}>-</button>
            <h1>{numTickets}</h1>
            <button type="button" onClick={handleIncrement}>+</button>
          </div>

          {Array.from({ length: numTickets }).map((_, index) => (
            <div key={index}>
              <h3>Passenger {index + 1} Details</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={passengerDetails[index].name}
                onChange={(e) => handlePassengerChange(index, e)}
                name="name"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={passengerDetails[index].age}
                onChange={(e) => handlePassengerChange(index, e)}
                name="age"
                required
              />
              <select
                value={passengerDetails[index].gender}
                onChange={(e) => handlePassengerChange(index, e)}
                name="gender"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          ))}

          <input
            type="number"
            placeholder="Number of Days for Trip"
            value={tripDays}
            onChange={(e) => setTripDays(e.target.value)}
            min="1"
            required
          />

          <div>
            <h3>Selected Holiday:</h3>
            {selectedHoliday.placeName ? (
              <p>
                {selectedHoliday.placeName} - {selectedHoliday.tripDuration} at ₹{selectedHoliday.price} / person
              </p>
            ) : (
              <p>No holiday selected.</p>
            )}
          </div>

          <div>
            <h3>Selected Flight:</h3>
            {selectedFlight.FlightName ? (
              <p>
                {selectedFlight.FlightName} ({selectedFlight.FlightNumber}) - {selectedFlight.DepartureDestination} to {selectedFlight.ArrivalDestination} at {selectedFlight.DepartureTime}.
                <br />
                Price: ₹{selectedFlight.FlightPrice}
              </p>
            ) : (
              <p>No flight selected.</p>
            )}
          </div>

          <div>
            <h3>Selected Hotel:</h3>
            {selectedHotel.name ? (
              <p>
                {selectedHotel.name} - {selectedHotel.location} for ₹{selectedHotel.price} per night.
                <br />
                
              </p>
            ) : (
              <p>No hotel selected.</p>
            )}
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Booking;

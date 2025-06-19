import React, { useState, useEffect } from "react";
import "../styles/MyBookings.css"; // Your custom CSS file

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedInUserId");
    const storedBookings = JSON.parse(localStorage.getItem("userBookings")) || [];

    if (storedUserId) {
      const userBookings = storedBookings.filter(
        (booking) => booking.userId === storedUserId
      );
      setBookings(userBookings);
    }
  }, []);

  const handleCancelBooking = (indexToRemove) => {
    const storedUserId = localStorage.getItem("loggedInUserId");
    const storedBookings = JSON.parse(localStorage.getItem("userBookings")) || [];

    // Remove the booking from bookings state
    const updatedBookings = bookings.filter((_, index) => index !== indexToRemove);
    setBookings(updatedBookings);

    // Remove from localStorage: remove the specific user's booking
    const updatedStoredBookings = storedBookings.filter(
      (booking) => !(booking.userId === storedUserId && booking === bookings[indexToRemove])
    );

    localStorage.setItem("userBookings", JSON.stringify(updatedStoredBookings));
  };

  if (bookings.length === 0) {
    return <div>No bookings found!</div>;
  }

  return (
    <div id="myBookings">
      <h2>My Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Trip Country</th>
            <th>Number of Passengers</th>
            <th>Amount Paid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.holidayDetails.placeName}</td>
              <td>{booking.numTickets}</td>
              <td>
                ₹
                {booking.totalAmount || booking.holidayDetails.price * booking.numTickets}
              </td>
              <td>
                <button onClick={() => handleCancelBooking(index)}>Cancel Trip</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;

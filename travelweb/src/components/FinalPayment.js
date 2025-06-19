import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FinalPayment.css"; // optional

function FinalPayment() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Retrieve all booking data from localStorage
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    if (!bookingData) {
      return;
    }
    setData(bookingData); // Set the data to state for rendering
  }, []);

  if (!data) {
    return <div>No booking data found!</div>;
  }

  const { numTickets, holidayDetails, hotelDetails, flightDetails } = data;

  // Calculate the total cost for the holiday per person based on the number of days
  const holidayPricePerPerson = holidayDetails.price * (4 / 7); // Adjust for 4 days (example)
  const totalHolidayCost = holidayPricePerPerson * numTickets;
  const totalFlightCost = flightDetails.FlightPrice * numTickets;
  const totalHotelCost = hotelDetails.price * 4 * numTickets; // Price per night multiplied by 4 days
  const total = totalHolidayCost + totalFlightCost + totalHotelCost;
  const formattedTotal = total.toFixed(2);

  // Form validation handler
  const validateForm = (e) => {
    e.preventDefault();
    const errors = {};

    // Validate Card Number (16 digits)
    const cardNumber = e.target.cardNumber.value;
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits.";
    }

    // Validate Name on Card (non-empty)
    const cardName = e.target.cardName.value;
    if (!cardName.trim()) {
      errors.cardName = "Name on card is required.";
    }

    // Validate Expiration Date (should be in the future)
    const expiryDate = e.target.expiryDate.value;
    const currentDate = new Date();
    const expiration = new Date(expiryDate);
    if (expiration < currentDate) {
      errors.expiryDate = "Expiration date must be in the future.";
    }

    // Validate CVV (3 digits)
    const cvv = e.target.cvv.value;
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV must be 3 digits.";
    }

    setFormErrors(errors);

    // If no errors, save the booking data and navigate to bookings page
    if (Object.keys(errors).length === 0) {
      // Save booking data in localStorage
      const newBooking = {
        holidayDetails,
        hotelDetails,
        flightDetails,
        numTickets,
        totalAmount: formattedTotal,
        cardName,
        cardNumber,
      };

      let bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
      bookings.push(newBooking);
      localStorage.setItem("myBookings", JSON.stringify(bookings));

      navigate("/my-bookings"); // Redirect to "My Bookings" page
    }
  };

  return (
    <div id="DetailsBody">
      <div id="DetailsContainer">
        <div id="pay">
          <div className="payment-form">
            <h3>Enter Payment Details</h3>
            <form onSubmit={validateForm}>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9123 4567"
                  required
                />
                {formErrors.cardNumber && <span className="error">{formErrors.cardNumber}</span>}
              </label>

              <label>
                Name on Card:
                <input
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  required
                />
                {formErrors.cardName && <span className="error">{formErrors.cardName}</span>}
              </label>

              <label>
                Expiration Date:
                <input
                  type="month"
                  name="expiryDate"
                  required
                />
                {formErrors.expiryDate && <span className="error">{formErrors.expiryDate}</span>}
              </label>

              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  required
                />
                {formErrors.cvv && <span className="error">{formErrors.cvv}</span>}
              </label>
              <h2>Total Amount: ₹{formattedTotal}</h2> {/* Display the total cost */}
              <button type="submit">Book Trip</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalPayment;

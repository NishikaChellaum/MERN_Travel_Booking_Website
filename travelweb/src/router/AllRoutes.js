import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "../components/Login";
import FlightCard from "../components/FlightCard"; // ✅ Correct path
import HotelCard from "../components/HotelCard";
import ForgotPassword from "../components/ForgotPasswod";
import Booking from "../components/Booking";
import Holidays from "../components/Holidays";
import FinalPayment from "../components/FinalPayment";
import MyBookings from "../components/MyBookings"; // ✅ Import MyBookings page

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
            <About />
            <Contact />
          </>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/flightcard" element={<FlightCard />} />
      <Route path="/hotelcard" element={<HotelCard />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/holidays" element={<Holidays />} />
      <Route path="/FinalPayment" element={<FinalPayment />} />
      <Route path="/my-bookings" element={<MyBookings />} /> {/* Add My Bookings route */}
    </Routes>
  );
};

export default AllRoutes;

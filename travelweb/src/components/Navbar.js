import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenuOnClickOutside = (event) => {
      if (!event.target.closest("#navbar")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav id="navbar">
      <a href="#home">
        <h1 id="logo">Voyawander</h1>
      </a>
      <ul id="nav-links" className={menuOpen ? "open" : ""}>
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About Us</a></li>
        <li><Link to="/hotelCard">Hotels</Link></li>
        <li><Link to="/flightcard">Flights</Link></li>
        <li><Link to="/holidays">Holidays</Link></li>
        <li><a href="#contact">Contact Us</a></li>
        <li><Link to="/login">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li> {/* Added link to My Bookings */}
      </ul>

      <div id="burger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;

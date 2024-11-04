import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="movies-link" to="/">Movie Bookings</Link>
      <ul className="navbar-links">
        <li>
          <Link to="/bookings">Booking History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

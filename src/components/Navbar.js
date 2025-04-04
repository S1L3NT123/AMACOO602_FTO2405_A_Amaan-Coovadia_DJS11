import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Podcast App</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
      </ul>
      <button onClick={toggleTheme} className="button-primary">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;

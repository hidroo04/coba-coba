import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/components/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.05)";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">
          <img src={logo} alt="SiPekan Logo" />
        </span>
        SiPekan
      </NavLink>

      <nav className={isMenuOpen ? "active" : ""}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/kegiatan" onClick={closeMenu}>
              Kegiatan
            </NavLink>
          </li>
          <li>
            <NavLink to="/data-anak" onClick={closeMenu}>
              Data Anak
            </NavLink>
          </li>
          <li>
            <NavLink to="/berita" onClick={closeMenu}>
              Berita
            </NavLink>
          </li>
        </ul>

        <div className="auth-buttons auth-buttons-mobile">
          <Link to="/login-admin" className="btn-login" onClick={closeMenu}>
            Login Admin
          </Link>
        </div>
      </nav>

      <div className="auth-buttons auth-buttons-desktop">
        <Link to="/login-admin" className="btn-login">
          Login Admin
        </Link>
      </div>

      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        id="hamburger"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navbar;

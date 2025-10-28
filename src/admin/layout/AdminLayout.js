import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import logo from "../../assets/logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    alert("Anda telah logout.");
    navigate("/"); 
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="admin-layout">
      
      {/* ======================================================== */}
      {/* HEADER UTAMA HORIZONTAL */}
      {/* Tombol hamburger kini terpisah di luar header-logo-container */}
      {/* ======================================================== */}
      <header className="admin-header">
        
        {/* Kontainer Logo & Nama Admin (KIRI) */}
        <div className="header-logo-container">
          <img src={logo} alt="Logo" />
          <span>Admin SiPekan</span>
        </div>

        {/* Navbar Desktop (TENGAH) */}
        <nav className="header-nav-desktop">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/kelola-kegiatan">Kelola Kegiatan</NavLink>
          <NavLink to="/admin/kelola-data">Kelola Data</NavLink>
        </nav>
        
        {/* Kontrol KANAN (Desktop Logout & Mobile Hamburger) */}
        <div className="header-controls-right">
            {/* Tombol Hamburger (Hanya terlihat di Mobile) */}
            <button className="hamburger-btn" onClick={toggleMenu} aria-expanded={isMenuOpen}>
                {isMenuOpen ? '✖' : '☰'} 
            </button>
            
            {/* Logout Button (Hanya terlihat di Desktop) */}
            <div className="header-controls-desktop">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MENU MOBILE OVERLAY */}
      {/* ======================================================== */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}>
          <nav className="admin-nav-mobile" onClick={(e) => e.stopPropagation()}> 
              <NavLink to="/admin" end onClick={closeMenu}>Dashboard</NavLink>
              <NavLink to="/admin/kelola-kegiatan" onClick={closeMenu}>Kelola Kegiatan</NavLink>
              <NavLink to="/admin/kelola-data" onClick={closeMenu}>Kelola Data</NavLink>
              
              <div className="mobile-logout-footer">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
          </nav>
      </div>
      <main className="admin-content-horizontal">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
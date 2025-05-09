import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Jika ada token, berarti sudah login
  }, [location]); // Re-run saat route berubah (misalnya setelah login)

  return (
    <nav className="navbar">
      <h2 className="logo">AnimalEdu</h2>
      <ul className="nav-links">
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/animals">Hewan</Link></li>
        <li><Link to="/quiz">Kuis</Link></li>
        <li><Link to="/minigame">Game</Link></li>
        <li><Link to="/gallery">Galeri</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>

        {/* Hanya tampilkan login jika belum login */}
        {!isLoggedIn && (
          <li><Link to="/admin/login">Login Admin</Link></li>
        )}

        {/* Hanya tampilkan dashboard jika sudah login */}
        {isLoggedIn && (
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

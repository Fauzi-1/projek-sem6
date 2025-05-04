import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css'

const Navbar = () => {
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
        <li><Link to="/admin/login">Login Admin</Link></li>
        <li><Link to="/admin/register">Register Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

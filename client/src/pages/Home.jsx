// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css'
import heroImage from '../assets/hero-animals.png'; // ganti sesuai gambar kamu

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Selamat Datang di Dunia Hewan Langka!</h1>
          <p>Mari belajar dan bermain sambil mengenal hewan-hewan yang hampir punah 🌱</p>
          <Link to="/animals" className="btn-eksplorasi">Eksplorasi Sekarang</Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Hewan Langka" />
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="fitur-utama">
        <h2>Fitur</h2>
        <div className="fitur-grid">
          <Link to="/animals" className="fitur-card">🐯 Daftar Hewan</Link>
          <Link to="/quiz" className="fitur-card">🧠 Kuis </Link>
          <Link to="/chatbot" className="fitur-card">🤖 Chatbot</Link>
          <Link to="/gallery" className="fitur-card">🖼️ Galeri Gambar</Link>
          <Link to="/minigame" className="fitur-card">🎮 Mini Game</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

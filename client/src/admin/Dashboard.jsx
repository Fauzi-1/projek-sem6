// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi programatik
import AnimalForm from './forms/AnimalForm';
import QuizForm from './forms/QuizForm';
import GalleryForm from './forms/GalleryForm';
import axios from '../api/api';
import '../assets/styles/admin-dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('animal');
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const navigate = useNavigate(); // Hook untuk redirect

  // Cek token saat komponen pertama kali dimount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Jika tidak ada token, redirect ke halaman login admin
      navigate('/admin/login');
    } else {
      // Jika ada token, panggil semua data
      fetchAnimals();
      fetchQuizzes();
      fetchGalleries();
    }
  }, []);

  // Fungsi mengambil data hewan dari API (dengan token)
  const fetchAnimals = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/animals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimals(res.data);
    } catch (error) {
      console.error('Gagal memuat data hewan:', error);
    }
  };

  // Fungsi mengambil data kuis dari API (dengan token)
  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/quiz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(res.data);
    } catch (error) {
      console.error('Gagal memuat data kuis:', error);
    }
  };

  // Fungsi mengambil data galeri dari API (dengan token)
  const fetchGalleries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/gallery', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGalleries(res.data);
    } catch (error) {
      console.error('Gagal memuat data galeri:', error);
    }
  };

  // Fungsi logout: hapus token dan redirect ke login
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Tombol Logout */}
      <div style={{ textAlign: 'right' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Tab Navigasi */}
      <div className="tab-menu">
        <button
          className={activeTab === 'animal' ? 'active' : ''}
          onClick={() => setActiveTab('animal')}
        >
          Kelola Hewan
        </button>
        <button
          className={activeTab === 'quiz' ? 'active' : ''}
          onClick={() => setActiveTab('quiz')}
        >
          Kelola Kuis
        </button>
        <button
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Kelola Galeri
        </button>
      </div>

      {/* Konten Tab */}
      <div className="tab-content">
        {activeTab === 'animal' && (
          <>
            <h3>Data Hewan</h3>
            <AnimalForm
              selectedAnimal={selectedAnimal}
              fetchAnimals={fetchAnimals}
              onReset={() => setSelectedAnimal(null)}
            />
            <ul>
              {animals.map((animal) => (
                <li key={animal._id}>
                  {animal.name}
                  <button onClick={() => setSelectedAnimal(animal)}>Edit</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'quiz' && (
          <>
            <h3>Data Kuis</h3>
            <QuizForm
              selectedQuiz={selectedQuiz}
              fetchQuizzes={fetchQuizzes}
              onReset={() => setSelectedQuiz(null)}
            />
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz._id}>
                  {quiz.question}
                  <button onClick={() => setSelectedQuiz(quiz)}>Edit</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <h3>Data Galeri</h3>
            <GalleryForm
              selectedGallery={selectedGallery}
              fetchGalleries={fetchGalleries}
              onReset={() => setSelectedGallery(null)}
            />
            <ul>
              {galleries.map((gallery) => (
                <li key={gallery._id}>
                  {gallery.title}
                  <button onClick={() => setSelectedGallery(gallery)}>Edit</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimalForm from './forms/AnimalForm';
import QuizForm from './forms/QuizForm';
import GalleryForm from './forms/GalleryForm';
import ChatbotForm from './forms/ChatbotForm';
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

  const [chatbots, setChatbots] = useState([]);
  const [selectedChatbot, setSelectedChatbot] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchAnimals();
      fetchQuizzes();
      fetchGalleries();
      fetchChatbots();
    }
  }, []);

  const tokenHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const fetchAnimals = async () => {
    try {
      const res = await axios.get('/animals', tokenHeader);
      setAnimals(res.data);
    } catch (error) {
      console.error('Gagal memuat data hewan:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('/quiz', tokenHeader);
      setQuizzes(res.data);
    } catch (error) {
      console.error('Gagal memuat data kuis:', error);
    }
  };

  const fetchGalleries = async () => {
    try {
      const res = await axios.get('/gallery', tokenHeader);
      setGalleries(res.data);
    } catch (error) {
      console.error('Gagal memuat data galeri:', error);
    }
  };

  const fetchChatbots = async () => {
    try {
      const res = await axios.get('/chatbot', tokenHeader);
      setChatbots(res.data);
    } catch (error) {
      console.error('Gagal memuat data chatbot:', error);
    }
  };

  // ✅ DELETE HANDLERS
  const handleDeleteAnimal = async (id) => {
    if (window.confirm('Yakin ingin menghapus hewan ini?')) {
      try {
        await axios.delete(`/animals/${id}`, tokenHeader);
        fetchAnimals();
      } catch (error) {
        console.error('Gagal menghapus hewan:', error);
      }
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('Yakin ingin menghapus kuis ini?')) {
      try {
        await axios.delete(`/quiz/${id}`, tokenHeader);
        fetchQuizzes();
      } catch (error) {
        console.error('Gagal menghapus kuis:', error);
      }
    }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Yakin ingin menghapus galeri ini?')) {
      try {
        await axios.delete(`/gallery/${id}`, tokenHeader);
        fetchGalleries();
      } catch (error) {
        console.error('Gagal menghapus galeri:', error);
      }
    }
  };

  const handleDeleteChatbot = async (id) => {
    if (window.confirm('Yakin ingin menghapus entri chatbot ini?')) {
      try {
        await axios.delete(`/chatbot/${id}`, tokenHeader);
        fetchChatbots();
      } catch (error) {
        console.error('Gagal menghapus chatbot:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={() => navigate('/')}>← Kembali ke Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="tab-menu">
        <button className={activeTab === 'animal' ? 'active' : ''} onClick={() => setActiveTab('animal')}>
          Kelola Hewan
        </button>
        <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>
          Kelola Kuis
        </button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>
          Kelola Galeri
        </button>
        <button className={activeTab === 'chatbot' ? 'active' : ''} onClick={() => setActiveTab('chatbot')}>
          Kelola Chatbot
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'animal' && (
          <>
            <h3>Data Hewan</h3>
            <div className="form-section">
              <AnimalForm
                selectedAnimal={selectedAnimal}
                fetchAnimals={fetchAnimals}
                onReset={() => setSelectedAnimal(null)}
              />
            </div>
            <ul>
              {animals.map((animal) => (
                <li key={animal._id}>
                  {animal.name}
                  <button onClick={() => setSelectedAnimal(animal)}>Edit</button>
                  <button onClick={() => handleDeleteAnimal(animal._id)}>Hapus</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'quiz' && (
          <>
            <h3>Data Kuis</h3>
            <div className="form-section">
              <QuizForm
                selectedQuiz={selectedQuiz}
                fetchQuizzes={fetchQuizzes}
                onReset={() => setSelectedQuiz(null)}
              />
            </div>
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz._id}>
                  {quiz.question}
                  <button onClick={() => setSelectedQuiz(quiz)}>Edit</button>
                  <button onClick={() => handleDeleteQuiz(quiz._id)}>Hapus</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <h3>Data Galeri</h3>
            <div className="form-section">
              <GalleryForm
                selectedGallery={selectedGallery}
                fetchGalleries={fetchGalleries}
                onReset={() => setSelectedGallery(null)}
              />
            </div>
            <ul>
              {galleries.map((gallery) => (
                <li key={gallery._id}>
                  {gallery.title}
                  <button onClick={() => setSelectedGallery(gallery)}>Edit</button>
                  <button onClick={() => handleDeleteGallery(gallery._id)}>Hapus</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'chatbot' && (
          <>
            <h3>Data Chatbot</h3>
            <div className="form-section">
              <ChatbotForm
                selectedChatbot={selectedChatbot}
                fetchChatbots={fetchChatbots}
              />
            </div>
            <ul>
              {chatbots.map((chatbot) => (
                <li key={chatbot._id}>
                  <strong>{chatbot.questionPattern}</strong> ➜ {chatbot.response}
                  <button onClick={() => setSelectedChatbot(chatbot)}>Edit</button>
                  <button onClick={() => handleDeleteChatbot(chatbot._id)}>Hapus</button>
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

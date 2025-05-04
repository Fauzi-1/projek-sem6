// src/pages/MiniGame.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/api'; // Sudah setting baseURL di sini
import '../assets/styles/MiniGame.css'

const MiniGame = () => {
  const [animals, setAnimals] = useState([]);
  const [droppedItems, setDroppedItems] = useState({});

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await axios.get('/animals');
      setAnimals(res.data);
    } catch (error) {
      console.error('Gagal mengambil data hewan:', error);
    }
  };

  const handleDrop = (e, habitat) => {
    const animalId = e.dataTransfer.getData('animalId');
    setDroppedItems((prev) => ({ ...prev, [habitat]: animalId }));
  };

  const handleDragStart = (e, animalId) => {
    e.dataTransfer.setData('animalId', animalId);
  };

  const isCorrect = (animalId, habitat) => {
    const animal = animals.find((a) => a._id === animalId);
    return animal?.habitat === habitat;
  };

  return (
    <div className="minigame-container">
      <h2>Mini Game: Tarik dan Jatuhkan Hewan ke Habitatnya</h2>

      <div className="drag-items">
        {animals.map((animal) => (
          <div
            key={animal._id}
            className="drag-item"
            draggable
            onDragStart={(e) => handleDragStart(e, animal._id)}
          >
            <img
              src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${animal.image}`}
              alt={animal.name}
            />
            <p>{animal.name}</p>
          </div>
        ))}
      </div>

      <div className="drop-zones">
        {/* Buat semua habitat unik */}
        {[...new Set(animals.map((a) => a.habitat))].map((habitat) => (
          <div
            key={habitat}
            className="drop-zone"
            onDrop={(e) => handleDrop(e, habitat)}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{habitat}</p>
            {droppedItems[habitat] && (
              <div
                className={`result ${isCorrect(droppedItems[habitat], habitat) ? 'correct' : 'wrong'}`}
              >
                {animals.find((a) => a._id === droppedItems[habitat])?.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniGame;

import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import '../assets/styles/AnimalList.css'


const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('/animals');
        setAnimals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data hewan:', error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return <p>Memuat data hewan...</p>;
  }

  return (
    <div className="animal-list-container">
      <h2>Daftar Hewan Langka</h2>
      <div className="animal-grid">
        {animals.map((animal) => (
          <div className="animal-card" key={animal._id}>
            <img src={animal.image} alt={animal.name} />
            <h3>{animal.name}</h3>
            <p><strong>Habitat:</strong> {animal.habitat}</p>
            <p><strong>Status:</strong> {animal.conservationStatus}</p>
            <p className="desc">{animal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalList;

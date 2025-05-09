import React, { useState, useEffect } from 'react';
import axios from '../../api/api';

const AnimalForm = ({ selectedAnimal, fetchAnimals, onReset }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    habitat: '',
    conservationStatus: '',
    image: null,
    sound: null,
  });

  useEffect(() => {
    if (selectedAnimal) {
      setFormData({
        name: selectedAnimal.name || '',
        description: selectedAnimal.description || '',
        habitat: selectedAnimal.habitat || '',
        conservationStatus: selectedAnimal.conservationStatus || '',
        image: null,
        sound: null,
      });
    } else {
      resetForm();
    }
  }, [selectedAnimal]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      habitat: '',
      conservationStatus: '',
      image: null,
      sound: null,
    });
    if (onReset) onReset();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('habitat', formData.habitat);
      payload.append('conservationStatus', formData.conservationStatus);
      if (formData.image) payload.append('image', formData.image);
      if (formData.sound) payload.append('sound', formData.sound);

      if (selectedAnimal) {
        await axios.put(`/animals/${selectedAnimal._id}`, payload, config);
      } else {
        await axios.post('/animals', payload, config);
      }

      fetchAnimals();
      resetForm();
    } catch (error) {
      console.error('Gagal menyimpan data hewan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animal-form">
      <input
        type="text"
        name="name"
        placeholder="Nama Hewan"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="habitat"
        placeholder="Habitat"
        value={formData.habitat}
        onChange={handleChange}
      />
      <input
        type="text"
        name="conservationStatus"
        placeholder="Status Konservasi"
        value={formData.conservationStatus}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
      <input
        type="file"
        name="sound"
        accept="audio/*"
        onChange={handleFileChange}
      />
      <button type="submit">
        {selectedAnimal ? 'Update Hewan' : 'Tambah Hewan'}
      </button>
      {selectedAnimal && (
        <button type="button" onClick={resetForm}>
          Batal Edit
        </button>
      )}
    </form>
  );
};

export default AnimalForm;

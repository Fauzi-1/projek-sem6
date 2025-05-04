// Import React dan hooks useState, useEffect
import React, { useState, useEffect } from 'react';
// Import instance axios custom dari folder api
import axios from '../../api/api';

// Komponen Form untuk tambah/edit data hewan
const AnimalForm = ({ selectedAnimal, fetchAnimals, onReset }) => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    habitat: '',
    conservationStatus: '',
    image: null,
    sound: null,
  });

  // Saat ada perubahan pada selectedAnimal, isi form dengan data atau reset
  useEffect(() => {
    if (selectedAnimal) {
      // Isi form jika ada data hewan yang dipilih (untuk edit)
      setFormData({
        name: selectedAnimal.name || '',
        description: selectedAnimal.description || '',
        habitat: selectedAnimal.habitat || '',
        conservationStatus: selectedAnimal.conservationStatus || '',
        image: null, // file tidak bisa diprefill
        sound: null,
      });
    } else {
      resetForm(); // Jika tidak ada yang dipilih, reset form
    }
  }, [selectedAnimal]);

  // Fungsi reset form ke nilai awal
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      habitat: '',
      conservationStatus: '',
      image: null,
      sound: null,
    });
    if (onReset) onReset(); // Panggil callback jika disediakan
  };

  // Handler untuk input teks (name, description, dll.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk input file (image, sound)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  // Handler submit form (tambah/update data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ambil token dari localStorage untuk autentikasi
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Penting untuk upload file
        },
      };

      // Buat FormData untuk mengirim data termasuk file
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('habitat', formData.habitat);
      payload.append('conservationStatus', formData.conservationStatus);
      if (formData.image) payload.append('image', formData.image);
      if (formData.sound) payload.append('sound', formData.sound);

      // Jika sedang edit, gunakan PUT. Jika tidak, gunakan POST.
      if (selectedAnimal) {
        await axios.put(`/animals/${selectedAnimal._id}`, payload, config);
      } else {
        await axios.post('/animals', payload, config);
      }

      fetchAnimals(); // Refresh data hewan
      resetForm(); // Kosongkan form setelah submit
    } catch (error) {
      console.error('Gagal menyimpan data hewan:', error);
    }
  };

  // Tampilan form input
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
        placeholder="Status Konservasi (misal: Terancam)"
        value={formData.conservationStatus}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        accept="image/*"
      />
      <input
        type="file"
        name="sound"
        onChange={handleFileChange}
        accept="audio/*"
      />
      <button type="submit">
        {/* Ganti teks tombol sesuai kondisi: tambah atau update */}
        {selectedAnimal ? 'Update Hewan' : 'Tambah Hewan'}
      </button>
      {/* Tombol batal hanya muncul saat edit */}
      {selectedAnimal && (
        <button type="button" onClick={resetForm}>
          Batal Edit
        </button>
      )}
    </form>
  );
};

export default AnimalForm;

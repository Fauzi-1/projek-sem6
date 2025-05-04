import React, { useEffect, useState } from 'react';
import axios from '../../api/api';

const GalleryForm = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get('/gallery');
      setGalleryItems(res.data);
    } catch (error) {
      console.error('Gagal memuat galeri:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editId) {
        await axios.put(`/gallery/${editId}`, {
          title: formData.title,
          image: formData.image, // Hanya kalau kamu buat upload di update juga
        });
        setEditId(null);
      } else {
        await axios.post('/gallery', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setFormData({ title: '', image: null });
      fetchGallery();
    } catch (error) {
      console.error('Gagal submit:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, image: null });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus gambar ini?')) {
      try {
        await axios.delete(`/gallery/${id}`);
        fetchGallery();
      } catch (error) {
        console.error('Gagal menghapus gambar:', error);
      }
    }
  };

  return (
    <div>
      <h2>Kelola Galeri</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul gambar"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          required={!editId}
        />
        <button type="submit">{editId ? 'Update' : 'Tambah'}</button>
      </form>

      <ul>
        {galleryItems.map((item) => (
          <li key={item._id}>
            <strong>{item.title}</strong><br />
            <img src={item.image} alt={item.title} style={{ width: '150px' }} /><br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryForm;

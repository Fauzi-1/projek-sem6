import { useEffect, useState } from 'react';
import axios from '../api/api';
import '../assets/styles/Gallery.css'

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get('/gallery');
      setGallery(res.data);
    } catch (error) {
      console.error('Gagal memuat galeri:', error);
    }
  };

  return (
    <div className="gallery-page">
      <h2>Galeri Gambar Hewan</h2>

      <div className="gallery-grid">
        {gallery.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

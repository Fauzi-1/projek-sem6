const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path ke gambar, contoh: '/uploads/gallery/namafile.jpg'
    required: true,
  },
}, {
  timestamps: true,
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;

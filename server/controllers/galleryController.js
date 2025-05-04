const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data galeri.' });
  }
};

// Add new gallery item
exports.addImage = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? `/uploads/gallery/${req.file.filename}` : '';

    if (!title || !image) {
      return res.status(400).json({ error: 'Judul dan gambar wajib diisi.' });
    }

    const newImage = new Gallery({ title, image });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan gambar.' });
  }
};

// Update gallery item
exports.updateImage = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedData = { title };

    // Kalau upload gambar baru
    if (req.file) {
      updatedData.image = `/uploads/gallery/${req.file.filename}`;
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui gambar.' });
  }
};

// Delete gallery item
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gambar berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus gambar.' });
  }
};

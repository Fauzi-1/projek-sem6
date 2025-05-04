const Animal = require('../models/Animal');

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data hewan.' });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const { name, description, habitat, conservationStatus, image, sound } = req.body;
    const newAnimal = new Animal({ name, description, habitat, conservationStatus, image, sound });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat hewan baru.' });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui data hewan.' });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hewan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus hewan.' });
  }
};

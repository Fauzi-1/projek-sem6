const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const protect = require('../middleware/authMiddleware');
const uploadAnimal = require('../middleware/uploadAnimal'); // Middleware upload khusus hewan

router.get('/', animalController.getAllAnimals);

// Admin Only (dengan middleware protect dan upload gambar)
router.post('/', protect, uploadAnimal.single('image'), animalController.createAnimal);
router.put('/:id', protect, uploadAnimal.single('image'), animalController.updateAnimal);
router.delete('/:id', protect, animalController.deleteAnimal);

module.exports = router;

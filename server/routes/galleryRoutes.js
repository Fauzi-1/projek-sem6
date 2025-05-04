const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadAnimal');

router.get('/', galleryController.getAllImages);
router.post('/', authMiddleware, upload.single('image'), galleryController.addImage);
router.put('/:id', authMiddleware, upload.single('image'), galleryController.updateImage);
router.delete('/:id', authMiddleware, galleryController.deleteImage);

module.exports = router;

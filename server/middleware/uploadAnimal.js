// server/middleware/uploadAnimal.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'animals',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;

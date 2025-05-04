const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan untuk folder uploads/animals
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/animals');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Filter untuk hanya mengizinkan file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maks 5MB
});

module.exports = upload;

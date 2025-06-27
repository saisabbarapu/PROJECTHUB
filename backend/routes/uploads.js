import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/pdfs');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images');
    } else {
      cb(new Error('Unsupported file type'), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage });

// Handle multiple file uploads (PDF and image)
router.post('/', upload.fields([{ name: 'pdf' }, { name: 'image' }]), (req, res) => {
  if (!req.files || !req.files.pdf || !req.files.image) {
    return res.status(400).json({ error: 'PDF and image files are required' });
  }
  res.json({
    pdfFilename: req.files.pdf[0].filename,
    imageFilename: req.files.image[0].filename,
  });
});

export default router;
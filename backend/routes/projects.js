import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose'; // ✅ Added to fix the error
import Project from '../models/Project.js';
import { getAllProjects, createProject, addLike, deleteProject } from '../controllers/projectsController.js';
import { transporter } from '../server.js'; // For nodemailer
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(__dirname, '../uploads/pdfs');
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(__dirname, '../uploads/images');
    } else {
      return cb(new Error('Invalid file type'), null);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for pdf field'));
    }
    if (file.fieldname === 'image' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed for image field'));
    }
    cb(null, true);
  },
});

// Middleware to parse non-file fields
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', getAllProjects);

router.post(
  '/',
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  createProject
);

router.post('/:id/like', addLike);

router.delete('/:id', deleteProject);

// 🔥 Top Liked Projects Endpoint
router.get('/top-liked', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }

    const topProjects = await Project.find().sort({ likes: -1 }).limit(3).select('+toolsUsed +likes +imageData +pdfData +imageMimeType');
    res.json(topProjects.map(p => ({
      ...p.toObject(),
      toolsUsed: p.toolsUsed || [],
    })));
  } catch (err) {
    console.error('Error in getTopLikedProjects:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to fetch top liked projects', details: err.message });
  }
});

// 🔥 Feedback Submission + Email
router.post('/:id/feedback', async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    if (!feedback || !feedback.trim()) {
      return res.status(400).json({ error: 'Feedback is required' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'projecthubs983@gmail.com',
      to: project.email,
      subject: `New Feedback for Your Project: ${project.title}`,
      text: `Hello ${project.name},\n\nYou have received new feedback for your project "${project.title}":\n\n${feedback}\n\nBest regards,\nProjectHub Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Feedback email sent to ${project.email} at ${new Date().toISOString()}`);

    res.json({ message: 'Feedback submitted and email sent', projectId: id });
  } catch (err) {
    console.error('Error in feedback submission:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to submit feedback', details: err.message });
  }
});

// Route to get image data from database
router.get('/:id/image', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    if (!project.imageData) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Convert base64 back to buffer
    const imageBuffer = Buffer.from(project.imageData, 'base64');
    
    // Set appropriate headers
    res.setHeader('Content-Type', project.imageMimeType || 'image/jpeg');
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    res.send(imageBuffer);
  } catch (err) {
    console.error('Error serving image:', err.message);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// Route to get PDF data from database
router.get('/:id/pdf', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    if (!project.pdfData) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    
    // Convert base64 back to buffer
    const pdfBuffer = Buffer.from(project.pdfData, 'base64');
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Content-Disposition', `inline; filename="${project.title}.pdf"`);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error serving PDF:', err.message);
    res.status(500).json({ error: 'Failed to serve PDF' });
  }
});

export default router;
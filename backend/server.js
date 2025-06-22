import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import projectRoutes from './routes/projects.js';
import userRoutes from './routes/userRoutes.js'; // New user routes
import nodemailer from 'nodemailer';

// Suppress punycode deprecation warning
process.emitWarning = (warning, type, code, ctor) => {
  if (code === 'DEP00040') return;
  console.warn(`${type} [${code}]: ${warning}`);
};

const app = express();
const PORT = process.env.PORT || 4000;
const mongoDB_url =
  process.env.MONGODB_URL ||
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload folders exist - Vercel has a read-only filesystem, so this will only work locally.
// For production, you'll need a different solution for file uploads like a cloud storage service.
const pdfDir = path.join(__dirname, 'uploads/pdfs');
const imageDir = path.join(__dirname, 'uploads/images');
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'projecthubs983@gmail.com',
    pass: process.env.EMAIL_PASS || 'lcby vvej cmzf rgbe',
  },
});

// Allow all origins for Vercel deployment
app.use(cors());
app.use(express.json());

// Serve static files (Note: This might not work as expected in a serverless environment for uploads)
app.use('/uploads/images', express.static(imageDir));
app.use('/uploads/pdfs', express.static(pdfDir));

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes); // New user routes

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', database: dbStatus, timestamp: new Date().toISOString() });
});

// Test MongoDB connection endpoint
app.get('/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    await mongoose.connection.db.command({ ping: 1 });
    res.json({ message: 'MongoDB connection successful', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB connection test failed', details: err.message });
  }
});

// Connect to MongoDB
mongoose.connect(mongoDB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Start the server only if not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
export { transporter };
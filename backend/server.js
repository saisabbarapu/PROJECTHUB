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

// Ensure upload folders exist
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

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());

// Serve static files
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

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB at:', new Date().toISOString());
  mongoose
    .connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    })
    .then(() => {
      console.log('MongoDB connected at:', new Date().toISOString());
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.error('Stack trace:', err.stack);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toISOString()}`);
  connectWithRetry();
});

export { transporter };
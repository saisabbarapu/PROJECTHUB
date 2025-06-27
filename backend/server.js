import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import projectRoutes from './routes/projects.js';
import userRoutes from './routes/userRoutes.js'; // New user routes
import nodemailer from 'nodemailer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Suppress punycode deprecation warning
process.emitWarning = (warning, type, code, ctor) => {
  if (code === 'DEP00040') return;
  console.warn(`${type} [${code}]: ${warning}`);
};

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;

// MongoDB connection configuration with fallback
const mongoDB_url = process.env.MONGODB_URL || 
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

// Fallback to local MongoDB if Atlas fails
const localMongoDB_url = 'mongodb://localhost:27017/project-showcase';

let isUsingLocalDB = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret'
});

// Cloudinary storage for multer
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'projecthub',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

// Multer configuration for cloud storage
const upload = multer({ 
  storage: cloudinaryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Ensure upload folders exist (for local fallback)
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

// Enhanced CORS configuration for worldwide access
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://192.168.187.84:3000',
      'http://192.168.187.84:5173',
      // Add more IPs as needed
      'http://192.168.1.100:3000',
      'http://192.168.1.100:5173',
      'http://192.168.1.101:3000',
      'http://192.168.1.101:5173',
      // Cloud deployment URLs (will be added after deployment)
      'https://*.vercel.app',
      'https://*.railway.app',
      'https://*.render.com',
      'https://*.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
  })
);

// Increase payload size limit for file uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request timeout
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 seconds
  res.setTimeout(30000); // 30 seconds
  next();
});

// Serve static files with caching headers (local fallback)
app.use('/uploads/images', express.static(imageDir, {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));
app.use('/uploads/pdfs', express.static(pdfDir, {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Make upload middleware available to routes
app.set('upload', upload);
app.set('cloudinary', cloudinary.v2);

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes); // New user routes

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    database: dbStatus, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'not_configured'
  });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://192.168.187.84:3000',
      'http://192.168.187.84:5173',
      // Cloud deployment URLs
      'https://*.vercel.app',
      'https://*.railway.app',
      'https://*.render.com',
      'https://*.netlify.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// Make io available to controllers
app.set('io', io);

// Start the server only after MongoDB connection is established
const startServer = () => {
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT} at ${new Date().toISOString()}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`🌐 Network URL: http://192.168.187.84:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔍 DB test: http://localhost:${PORT}/test-db`);
    console.log(`☁️ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'}`);
  });
};

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  const connectionUrl = isUsingLocalDB ? localMongoDB_url : mongoDB_url;
  console.log('Attempting to connect to MongoDB at:', new Date().toISOString());
  console.log('Connection URL:', connectionUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
  
  mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      w: 'majority'
    })
    .then(() => {
      console.log('✅ MongoDB connected successfully at:', new Date().toISOString());
      if (isUsingLocalDB) {
        console.log('📝 Using local MongoDB database');
      } else {
        console.log('☁️ Using MongoDB Atlas database');
      }
      
      // Set up connection event listeners
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected at:', new Date().toISOString());
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected at:', new Date().toISOString());
      });
      
      // Start the server after successful connection
      startServer();
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      console.error('Error code:', err.code);
      console.error('Error name:', err.name);
      
      // Provide specific error messages for common issues
      if (err.code === 'ENOTFOUND') {
        console.error('🔍 DNS resolution failed. Check your internet connection.');
      } else if (err.code === 'ECONNREFUSED') {
        console.error('🚫 Connection refused. Check if MongoDB Atlas is accessible.');
      } else if (err.code === 'ETIMEDOUT') {
        console.error('⏰ Connection timeout. Check your network connection.');
      } else if (err.message.includes('Authentication failed')) {
        console.error('🔐 Authentication failed. Check your MongoDB credentials.');
      } else if (err.message.includes('ECONNRESET')) {
        console.error('🔄 Connection reset. This might be a temporary network issue.');
      }
      
      // Try local MongoDB as fallback if Atlas fails
      if (!isUsingLocalDB) {
        console.log('🔄 Trying local MongoDB as fallback...');
        isUsingLocalDB = true;
        setTimeout(connectWithRetry, 2000);
      } else {
        console.log('🔄 Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
      }
    });
};

// Initialize the application
console.log('🚀 Starting ProjectHub Backend Server...');
connectWithRetry();

export { transporter };
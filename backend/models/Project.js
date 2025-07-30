import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  rollno: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  github: {
    type: String,
    required: true,
    trim: true
  },
  projectUrl: {
    type: String,
    trim: true,
    default: ''
  },
  // Store images directly in database as base64
  imageData: {
    type: String, // Base64 encoded image
    required: true
  },
  imageMimeType: {
    type: String, // e.g., 'image/jpeg', 'image/png'
    required: true
  },
  // Store PDFs directly in database as base64
  pdfData: {
    type: String, // Base64 encoded PDF
    required: true
  },
  // Keep existing URL fields for backward compatibility
  pdfUrl: {
    type: String,
    required: false // Made optional since we're using pdfData
  },
  imageUrl: {
    type: String,
    required: false // Made optional since we're using imageData
  },
  toolsUsed: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better performance
projectSchema.index({ title: 1 });
projectSchema.index({ department: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ likes: -1 });

export default mongoose.model('Project', projectSchema);
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollno: String,
  department: String,
  title: String,
  description: String,
  github: String,
  pdfUrl: String,
  imageUrl: String,
  toolsUsed: [String],
  likes: { type: Number, default: 0 }, // Retained for like persistence
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Project', projectSchema);
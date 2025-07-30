import Project from '../models/Project.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export const getAllProjects = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }
    const projects = await Project.find().sort({ createdAt: -1 }).select('+toolsUsed +likes +imageData +pdfData +imageMimeType');
    res.json(projects.map(p => ({
      ...p.toObject(),
      toolsUsed: p.toolsUsed || [],
    })));
  } catch (err) {
    console.error('Error in getAllProjects:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }

    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    const { name, email, rollno, title, description, github, department, toolsUsed, projectUrl } = req.body;

    // Validate required fields
    if (!name || !email || !rollno || !title || !description || !github || !department) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate GitHub URL format
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/;
    if (!githubRegex.test(github)) {
      return res.status(400).json({ error: 'Invalid GitHub URL format' });
    }

    // Validate optional project URL if provided
    if (projectUrl && projectUrl.trim()) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(projectUrl)) {
        return res.status(400).json({ error: 'Invalid project URL format' });
      }
    }

    if (!req.files || !req.files.pdf || !req.files.image) {
      return res.status(400).json({ error: 'PDF and image files are required' });
    }

    // Validate file types
    const pdfFile = req.files.pdf[0];
    const imageFile = req.files.image[0];

    if (pdfFile.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'PDF file must be a valid PDF document' });
    }

    if (!imageFile.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Image file must be a valid image' });
    }

    // Validate file sizes (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (pdfFile.size > maxSize) {
      return res.status(400).json({ error: 'PDF file size must be less than 5MB' });
    }

    if (imageFile.size > maxSize) {
      return res.status(400).json({ error: 'Image file size must be less than 5MB' });
    }

    // Convert files to base64
    const pdfBuffer = fs.readFileSync(pdfFile.path);
    const imageBuffer = fs.readFileSync(imageFile.path);
    
    const pdfBase64 = pdfBuffer.toString('base64');
    const imageBase64 = imageBuffer.toString('base64');

    // Clean up uploaded files since we're storing in database
    fs.unlinkSync(pdfFile.path);
    fs.unlinkSync(imageFile.path);

    console.log('Received toolsUsed:', toolsUsed);

    const newProject = new Project({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rollno: rollno.trim(),
      title: title.trim(),
      description: description.trim(),
      github: github.trim(),
      projectUrl: projectUrl ? projectUrl.trim() : '',
      department: department.trim(),
      toolsUsed: toolsUsed ? toolsUsed.split(',').map(tool => tool.trim()).filter(tool => tool.length > 0) : [],
      // Store files directly in database
      pdfData: pdfBase64,
      imageData: imageBase64,
      imageMimeType: imageFile.mimetype,
      // Keep URLs empty since we're not using file storage
      pdfUrl: '',
      imageUrl: '',
    });

    const savedProject = await newProject.save();
    console.log('Saved project with toolsUsed:', savedProject.toolsUsed);
    
    // Emit real-time event to all clients
    const io = req.app.get('io');
    if (io) {
      io.emit('newProject', savedProject);
    }
    // Return success response with the saved project
    res.status(201).json({
      message: 'Project created successfully',
      project: savedProject
    });
  } catch (err) {
    console.error('Error in createProject:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Clean up uploaded files if they exist and error occurred
    if (req.files) {
      if (req.files.pdf && req.files.pdf[0]) {
        try {
          fs.unlinkSync(req.files.pdf[0].path);
        } catch (unlinkErr) {
          console.error('Failed to delete PDF file:', unlinkErr.message);
        }
      }
      if (req.files.image && req.files.image[0]) {
        try {
          fs.unlinkSync(req.files.image[0].path);
        } catch (unlinkErr) {
          console.error('Failed to delete image file:', unlinkErr.message);
        }
      }
    }
    
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
};

export const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail } = req.body;
    if (!userEmail) {
      return res.status(400).json({ error: 'User email is required to like/unlike a project.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const alreadyLiked = project.likedBy.includes(userEmail);
    if (alreadyLiked) {
      // Unlike
      project.likedBy = project.likedBy.filter(email => email !== userEmail);
      project.likes = Math.max((project.likes || 1) - 1, 0);
    } else {
      // Like
      project.likedBy.push(userEmail);
      project.likes = (project.likes || 0) + 1;
    }
    const updatedProject = await project.save();
    res.json({ likes: updatedProject.likes, likedBy: updatedProject.likedBy, _id: updatedProject._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add/remove like', details: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Since files are now stored in the database as base64, 
    // we don't need to delete files from disk anymore
    // The database deletion above already removes the file data

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
};
import Project from '../models/Project.js';
import mongoose from 'mongoose';

export const getAllProjects = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }
    const projects = await Project.find().sort({ createdAt: -1 }).select('+toolsUsed +likes');
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

    if (!req.files || !req.files.pdf || !req.files.image) {
      return res.status(400).json({ error: 'PDF and image files are required' });
    }

    const pdfPath = req.files.pdf[0].path.replace(/\\/g, '/');
    const imagePath = req.files.image[0].path.replace(/\\/g, '/');

    const pdfRelativePath = pdfPath.split('uploads/pdfs/')[1];
    const imageRelativePath = imagePath.split('uploads/images/')[1];

    const host = `${req.protocol}://${req.get('host')}`;

    const pdfUrl = `${host}/uploads/pdfs/${pdfRelativePath}`;
    const imageUrl = `${host}/uploads/images/${imageRelativePath}`;

    console.log('Received toolsUsed:', toolsUsed);

    const newProject = new Project({
      name,
      email,
      rollno,
      title,
      description,
      github,
      projectUrl: projectUrl || '', // Handle optional field
      department,
      toolsUsed: toolsUsed ? toolsUsed.split(',').map(tool => tool.trim()) : [],
      pdfUrl,
      imageUrl,
    });

    const savedProject = await newProject.save();
    console.log('Saved project with toolsUsed:', savedProject.toolsUsed);
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error in createProject:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
};

export const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to like project with ID: ${id}`); // Debug log
    if (mongoose.connection.readyState !== 1) {
      console.error('Database not connected during addLike at:', new Date().toISOString());
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }
    const project = await Project.findById(id);
    if (!project) {
      console.error(`Project not found with ID: ${id} at:`, new Date().toISOString());
      return res.status(404).json({ error: 'Project not found' });
    }
    project.likes = (project.likes || 0) + 1; // Ensure likes starts at 0 if undefined
    const updatedProject = await project.save();
    console.log(`Likes updated for project ${id} to ${updatedProject.likes} at:`, new Date().toISOString()); // Debug log
    res.json({ likes: updatedProject.likes, _id: updatedProject._id });
  } catch (err) {
    console.error('Error in addLike:', err.message, 'at:', new Date().toISOString());
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to add like', details: err.message });
  }
};
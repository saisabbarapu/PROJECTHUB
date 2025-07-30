import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from './models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection configuration
const mongoDB_url = process.env.MONGODB_URL || 
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

async function migrateProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoDB_url);
    console.log('Connected to MongoDB');

    // Get all projects that don't have imageData yet
    const projects = await Project.find({ 
      $or: [
        { imageData: { $exists: false } },
        { imageData: null },
        { imageData: '' }
      ]
    });

    console.log(`Found ${projects.length} projects to migrate`);

    for (const project of projects) {
      try {
        console.log(`Migrating project: ${project.title}`);

        // Check if image file exists
        if (project.imageUrl) {
          const imagePath = project.imageUrl.split('/uploads/images/')[1];
          if (imagePath) {
            const fullImagePath = path.join(__dirname, 'uploads', 'images', imagePath);
            
            if (fs.existsSync(fullImagePath)) {
              // Read and convert image to base64
              const imageBuffer = fs.readFileSync(fullImagePath);
              const imageBase64 = imageBuffer.toString('base64');
              
              // Determine MIME type from file extension
              const ext = path.extname(fullImagePath).toLowerCase();
              let mimeType = 'image/jpeg'; // default
              if (ext === '.png') mimeType = 'image/png';
              else if (ext === '.gif') mimeType = 'image/gif';
              else if (ext === '.webp') mimeType = 'image/webp';
              
              // Update project with image data
              project.imageData = imageBase64;
              project.imageMimeType = mimeType;
              
              console.log(`✓ Image migrated for: ${project.title}`);
            } else {
              console.log(`⚠ Image file not found for: ${project.title}`);
            }
          }
        }

        // Check if PDF file exists
        if (project.pdfUrl) {
          const pdfPath = project.pdfUrl.split('/uploads/pdfs/')[1];
          if (pdfPath) {
            const fullPdfPath = path.join(__dirname, 'uploads', 'pdfs', pdfPath);
            
            if (fs.existsSync(fullPdfPath)) {
              // Read and convert PDF to base64
              const pdfBuffer = fs.readFileSync(fullPdfPath);
              const pdfBase64 = pdfBuffer.toString('base64');
              
              // Update project with PDF data
              project.pdfData = pdfBase64;
              
              console.log(`✓ PDF migrated for: ${project.title}`);
            } else {
              console.log(`⚠ PDF file not found for: ${project.title}`);
            }
          }
        }

        // Save the updated project
        await project.save();
        console.log(`✓ Project saved: ${project.title}`);

      } catch (err) {
        console.error(`✗ Error migrating project ${project.title}:`, err.message);
      }
    }

    console.log('Migration completed!');
    
    // Optional: Clean up old files after successful migration
    console.log('Cleaning up old files...');
    const imageDir = path.join(__dirname, 'uploads', 'images');
    const pdfDir = path.join(__dirname, 'uploads', 'pdfs');
    
    if (fs.existsSync(imageDir)) {
      fs.rmSync(imageDir, { recursive: true, force: true });
      console.log('✓ Image directory cleaned');
    }
    
    if (fs.existsSync(pdfDir)) {
      fs.rmSync(pdfDir, { recursive: true, force: true });
      console.log('✓ PDF directory cleaned');
    }

  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProjects();
}

export default migrateProjects; 
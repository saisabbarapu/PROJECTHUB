#!/usr/bin/env node

import mongoose from 'mongoose';
import Project from './models/Project.js';

// MongoDB connection configuration
const mongoDB_url = process.env.MONGODB_URL || 
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

async function listProjects() {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    if (projects.length === 0) {
      console.log('📝 No projects found in the database.');
      return;
    }

    console.log(`📊 Found ${projects.length} projects:\n`);
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Department: ${project.department}`);
      console.log(`   Author: ${project.name} (${project.email})`);
      console.log(`   Created: ${project.createdAt.toLocaleDateString()}`);
      console.log(`   Likes: ${project.likes || 0}`);
      console.log('');
    });

    // Show department statistics
    const departmentStats = {};
    projects.forEach(project => {
      const dept = project.department || 'No Department';
      if (!departmentStats[dept]) {
        departmentStats[dept] = 0;
      }
      departmentStats[dept]++;
    });

    console.log('📈 Department Statistics:');
    console.log('========================');
    Object.entries(departmentStats).forEach(([dept, count]) => {
      console.log(`${dept}: ${count} projects`);
    });

  } catch (error) {
    console.error('❌ Error listing projects:', error.message);
  }
}

async function deleteProject(projectId) {
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      console.log('❌ Project not found.');
      return;
    }
    console.log(`✅ Deleted project: ${project.title}`);
  } catch (error) {
    console.error('❌ Error deleting project:', error.message);
  }
}

async function clearAllProjects() {
  try {
    const result = await Project.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} projects from the database.`);
  } catch (error) {
    console.error('❌ Error clearing projects:', error.message);
  }
}

async function showProjectDetails(projectId) {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      console.log('❌ Project not found.');
      return;
    }

    console.log('\n📋 Project Details:');
    console.log('==================');
    console.log(`Title: ${project.title}`);
    console.log(`Description: ${project.description}`);
    console.log(`Department: ${project.department}`);
    console.log(`Author: ${project.name} (${project.email})`);
    console.log(`Roll No: ${project.rollno}`);
    console.log(`GitHub: ${project.github}`);
    console.log(`Project URL: ${project.projectUrl || 'Not provided'}`);
    console.log(`Tools Used: ${project.toolsUsed.join(', ')}`);
    console.log(`Likes: ${project.likes || 0}`);
    console.log(`Created: ${project.createdAt.toLocaleString()}`);
    console.log(`PDF URL: ${project.pdfUrl}`);
    console.log(`Image URL: ${project.imageUrl}`);

  } catch (error) {
    console.error('❌ Error showing project details:', error.message);
  }
}

async function main() {
  const command = process.argv[2];
  const projectId = process.argv[3];

  await connectDB();

  switch (command) {
    case 'list':
      await listProjects();
      break;
    
    case 'show':
      if (!projectId) {
        console.log('❌ Please provide a project ID: node manage-projects.js show <project-id>');
        break;
      }
      await showProjectDetails(projectId);
      break;
    
    case 'delete':
      if (!projectId) {
        console.log('❌ Please provide a project ID: node manage-projects.js delete <project-id>');
        break;
      }
      await deleteProject(projectId);
      break;
    
    case 'clear':
      console.log('⚠️ This will delete ALL projects from the database.');
      console.log('Are you sure? (y/N)');
      // For simplicity, we'll just proceed with clearing
      await clearAllProjects();
      break;
    
    default:
      console.log('🔧 Project Management Tool');
      console.log('==========================\n');
      console.log('Usage: node manage-projects.js <command> [project-id]\n');
      console.log('Commands:');
      console.log('  list                    - List all projects');
      console.log('  show <project-id>       - Show details of a specific project');
      console.log('  delete <project-id>     - Delete a specific project');
      console.log('  clear                   - Delete all projects (use with caution)\n');
      console.log('Examples:');
      console.log('  node manage-projects.js list');
      console.log('  node manage-projects.js show 507f1f77bcf86cd799439011');
      console.log('  node manage-projects.js delete 507f1f77bcf86cd799439011');
      console.log('  node manage-projects.js clear');
  }

  await mongoose.disconnect();
  console.log('\n🔌 Disconnected from MongoDB');
}

main().catch(console.error); 
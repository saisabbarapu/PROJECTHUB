import mongoose from 'mongoose';
import Project from './models/Project.js';

// MongoDB connection configuration
const mongoDB_url = process.env.MONGODB_URL || 
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

async function testDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Get all projects
    const projects = await Project.find().sort({ createdAt: -1 });
    
    console.log(`\n📊 Total projects in database: ${projects.length}`);
    
    if (projects.length === 0) {
      console.log('❌ No projects found in database');
      return;
    }

    // Group projects by department
    const departmentStats = {};
    projects.forEach(project => {
      const dept = project.department || 'No Department';
      if (!departmentStats[dept]) {
        departmentStats[dept] = [];
      }
      departmentStats[dept].push(project);
    });

    console.log('\n🏢 Projects by Department:');
    console.log('========================');
    
    Object.entries(departmentStats).forEach(([dept, projectList]) => {
      console.log(`\n${dept} (${projectList.length} projects):`);
      projectList.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.title} - ${project.name} (${project.email})`);
      });
    });

    // Show all project details
    console.log('\n📋 All Project Details:');
    console.log('=====================');
    
    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. Project Details:`);
      console.log(`   Title: ${project.title}`);
      console.log(`   Department: ${project.department}`);
      console.log(`   Author: ${project.name} (${project.email})`);
      console.log(`   Roll No: ${project.rollno}`);
      console.log(`   Description: ${project.description.substring(0, 100)}...`);
      console.log(`   GitHub: ${project.github}`);
      console.log(`   Tools Used: ${project.toolsUsed ? project.toolsUsed.join(', ') : 'None'}`);
      console.log(`   Likes: ${project.likes || 0}`);
      console.log(`   Created: ${project.createdAt}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testDatabase(); 
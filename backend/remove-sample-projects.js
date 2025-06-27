import mongoose from 'mongoose';
import Project from './models/Project.js';

// MongoDB connection configuration
const mongoDB_url = process.env.MONGODB_URL || 
  'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

// Sample project titles to identify and remove
const sampleProjectTitles = [
  'Smart Home Automation System',
  'AI-Powered Chatbot',
  'E-commerce Platform',
  'Solar Power Monitoring System',
  'Automated Irrigation System',
  'Chemical Process Optimization',
  'Business Analytics Dashboard',
  'Bridge Health Monitoring'
];

// Sample email patterns to identify sample projects
const sampleEmails = [
  'john.doe@adityauniversity.in',
  'jane.smith@adityauniversity.in',
  'mike.johnson@adityauniversity.in',
  'sarah.wilson@adityauniversity.in',
  'david.brown@adityauniversity.in',
  'lisa.davis@adityauniversity.in',
  'tom.miller@adityauniversity.in',
  'emma.wilson@adityauniversity.in'
];

async function removeSampleProjects() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Find and remove projects by title
    const projectsByTitle = await Project.find({
      title: { $in: sampleProjectTitles }
    });

    // Find and remove projects by email
    const projectsByEmail = await Project.find({
      email: { $in: sampleEmails }
    });

    // Combine and remove duplicates
    const allSampleProjects = [...projectsByTitle, ...projectsByEmail];
    const uniqueProjects = allSampleProjects.filter((project, index, self) => 
      index === self.findIndex(p => p._id.toString() === project._id.toString())
    );

    if (uniqueProjects.length === 0) {
      console.log('✅ No sample projects found in the database.');
      return;
    }

    console.log(`📝 Found ${uniqueProjects.length} sample projects to remove:`);
    uniqueProjects.forEach(project => {
      console.log(`   - ${project.title} (${project.department}) - ${project.email}`);
    });

    // Remove the sample projects
    const projectIds = uniqueProjects.map(p => p._id);
    const deleteResult = await Project.deleteMany({ _id: { $in: projectIds } });

    console.log(`\n🗑️ Successfully removed ${deleteResult.deletedCount} sample projects!`);

    // Show remaining project count by department
    const remainingProjects = await Project.find();
    const departmentStats = {};
    remainingProjects.forEach(project => {
      const dept = project.department || 'No Department';
      if (!departmentStats[dept]) {
        departmentStats[dept] = 0;
      }
      departmentStats[dept]++;
    });

    console.log('\n📊 Remaining Project Count by Department:');
    console.log('=====================================');
    Object.entries(departmentStats).forEach(([dept, count]) => {
      console.log(`${dept}: ${count} projects`);
    });

    console.log(`\n📈 Total remaining projects: ${remainingProjects.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Also remove any projects with sample-like patterns
async function removeAdditionalSampleProjects() {
  try {
    console.log('\n🔍 Checking for additional sample-like projects...');
    
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Remove projects with sample URLs
    const sampleUrlPatterns = [
      'https://example.com/sample.pdf',
      'https://example.com/sample.jpg',
      'https://smart-home-demo.com',
      'https://ai-chatbot-demo.com',
      'https://ecommerce-demo.com',
      'https://solar-monitor-demo.com',
      'https://irrigation-demo.com',
      'https://chemical-opt-demo.com',
      'https://analytics-demo.com',
      'https://bridge-monitor-demo.com'
    ];

    const projectsWithSampleUrls = await Project.find({
      $or: [
        { pdfUrl: { $in: sampleUrlPatterns } },
        { imageUrl: { $in: sampleUrlPatterns } },
        { projectUrl: { $in: sampleUrlPatterns } }
      ]
    });

    if (projectsWithSampleUrls.length > 0) {
      console.log(`📝 Found ${projectsWithSampleUrls.length} additional sample projects with demo URLs:`);
      projectsWithSampleUrls.forEach(project => {
        console.log(`   - ${project.title} (${project.department})`);
      });

      const projectIds = projectsWithSampleUrls.map(p => p._id);
      const deleteResult = await Project.deleteMany({ _id: { $in: projectIds } });
      console.log(`🗑️ Removed ${deleteResult.deletedCount} additional sample projects!`);
    } else {
      console.log('✅ No additional sample projects found.');
    }

  } catch (error) {
    console.error('❌ Error in additional cleanup:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

// Run both cleanup functions
async function cleanupAllSampleProjects() {
  console.log('🧹 Starting Sample Projects Cleanup');
  console.log('==================================\n');
  
  await removeSampleProjects();
  await removeAdditionalSampleProjects();
  
  console.log('\n🎉 Sample projects cleanup completed!');
}

cleanupAllSampleProjects(); 
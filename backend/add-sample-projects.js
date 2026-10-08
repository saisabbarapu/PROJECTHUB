import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

// MongoDB connection configuration
const mongoDB_url =
  process.env.MONGODB_URL ||
  'mongodb+srv://admin:EduTrack123@cluster0.gz2pqrs.mongodb.net/projecthub?retryWrites=true&w=majority';

const sampleProjects = [
  {
    name: 'John Doe',
    email: 'john.doe@adityauniversity.in',
    rollno: '24m11mc001',
    title: 'Smart Home Automation System',
    description: 'An IoT-based home automation system using Arduino and mobile app control.',
    github: 'https://github.com/johndoe/smart-home',
    department: 'CSE',
    toolsUsed: ['Arduino', 'IoT', 'Mobile App', 'C++'],
    projectUrl: 'https://smart-home-demo.com',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@adityauniversity.in',
    rollno: '24m11mc002',
    title: 'AI-Powered Chatbot',
    description: 'A natural language processing chatbot for customer service.',
    github: 'https://github.com/janesmith/ai-chatbot',
    department: 'AI&ML',
    toolsUsed: ['Python', 'TensorFlow', 'NLP', 'Flask'],
    projectUrl: 'https://ai-chatbot-demo.com',
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@adityauniversity.in',
    rollno: '24m11mc003',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce website with payment integration.',
    github: 'https://github.com/mikejohnson/ecommerce',
    department: 'IT',
    toolsUsed: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    projectUrl: 'https://ecommerce-demo.com',
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@adityauniversity.in',
    rollno: '24m11mc004',
    title: 'Solar Power Monitoring System',
    description: 'Real-time monitoring system for solar panel efficiency.',
    github: 'https://github.com/sarahwilson/solar-monitor',
    department: 'ECE',
    toolsUsed: ['Arduino', 'Sensors', 'Data Analytics', 'Web Dashboard'],
    projectUrl: 'https://solar-monitor-demo.com',
  },
  {
    name: 'David Brown',
    email: 'david.brown@adityauniversity.in',
    rollno: '24m11mc005',
    title: 'Automated Irrigation System',
    description: 'Smart irrigation system using soil moisture sensors.',
    github: 'https://github.com/davidbrown/irrigation',
    department: 'MECH',
    toolsUsed: ['Arduino', 'Sensors', 'Automation', 'IoT'],
    projectUrl: 'https://irrigation-demo.com',
  },
  {
    name: 'Lisa Davis',
    email: 'lisa.davis@adityauniversity.in',
    rollno: '24m11mc006',
    title: 'Chemical Process Optimization',
    description: 'AI-based optimization of chemical manufacturing processes.',
    github: 'https://github.com/lisadavis/chemical-opt',
    department: 'CHEMICAL',
    toolsUsed: ['Python', 'Machine Learning', 'Process Control', 'Data Analysis'],
    projectUrl: 'https://chemical-opt-demo.com',
  },
  {
    name: 'Tom Miller',
    email: 'tom.miller@adityauniversity.in',
    rollno: '24m11mc007',
    title: 'Business Analytics Dashboard',
    description: 'Comprehensive business intelligence and analytics platform.',
    github: 'https://github.com/tommiller/analytics',
    department: 'MBA',
    toolsUsed: ['Tableau', 'SQL', 'Python', 'Power BI'],
    projectUrl: 'https://analytics-demo.com',
  },
  {
    name: 'Emma Wilson',
    email: 'emma.wilson@adityauniversity.in',
    rollno: '24m11mc008',
    title: 'Bridge Health Monitoring',
    description: 'Structural health monitoring system for bridges using sensors.',
    github: 'https://github.com/emmawilson/bridge-monitor',
    department: 'CIVIL',
    toolsUsed: ['Sensors', 'IoT', 'Data Analysis', 'Structural Engineering'],
    projectUrl: 'https://bridge-monitor-demo.com',
  },
];

async function addSampleProjects() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Check if sample projects already exist
    const existingProjects = await Project.find({
      title: { $in: sampleProjects.map((p) => p.title) },
    });

    if (existingProjects.length > 0) {
      console.log('⚠️ Some sample projects already exist. Skipping...');
      console.log(
        'Existing projects:',
        existingProjects.map((p) => p.title)
      );
      return;
    }

    // Add sample projects
    console.log('📝 Adding sample projects...');

    for (const projectData of sampleProjects) {
      const project = new Project({
        ...projectData,
        pdfUrl: 'https://example.com/sample.pdf',
        imageUrl: 'https://example.com/sample.jpg',
        likes: Math.floor(Math.random() * 10), // Random likes for testing
        createdAt: new Date(),
      });

      await project.save();
      console.log(`✅ Added: ${projectData.title} (${projectData.department})`);
    }

    console.log('\n🎉 All sample projects added successfully!');

    // Show updated project count by department
    const allProjects = await Project.find();
    const departmentStats = {};
    allProjects.forEach((project) => {
      const dept = project.department || 'No Department';
      if (!departmentStats[dept]) {
        departmentStats[dept] = 0;
      }
      departmentStats[dept]++;
    });

    console.log('\n📊 Updated Project Count by Department:');
    console.log('=====================================');
    Object.entries(departmentStats).forEach(([dept, count]) => {
      console.log(`${dept}: ${count} projects`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

addSampleProjects();

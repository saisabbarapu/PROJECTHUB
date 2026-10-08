import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Project from './models/Project.js';

dotenv.config();

const mongoDB_url =
  process.env.MONGODB_URL ||
  'mongodb+srv://admin:EduTrack123@cluster0.gz2pqrs.mongodb.net/projecthub?retryWrites=true&w=majority';

// Helper to create simple colorful SVG icons as base64 images
const createSvgImage = (title, category, color1, color2) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#grad)" />
    <!-- Grid overlay pattern -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="1.5">
      <line x1="0" y1="100" x2="800" y2="100" />
      <line x1="0" y1="200" x2="800" y2="200" />
      <line x1="0" y1="300" x2="800" y2="300" />
      <line x1="0" y1="400" x2="800" y2="400" />
      <line x1="160" y1="0" x2="160" y2="500" />
      <line x1="320" y1="0" x2="320" y2="500" />
      <line x1="480" y1="0" x2="480" y2="500" />
      <line x1="640" y1="0" x2="640" y2="500" />
    </g>
    <!-- Card Container -->
    <rect x="80" y="70" width="640" height="360" rx="24" fill="#0f172a" fill-opacity="0.75" filter="url(#shadow)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
    <!-- Badge -->
    <rect x="120" y="110" width="130" height="34" rx="17" fill="${color1}" fill-opacity="0.25" stroke="${color1}" stroke-width="1.5"/>
    <text x="185" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">${category.toUpperCase()}</text>
    <!-- Title -->
    <text x="120" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#ffffff">${title.length > 28 ? title.substring(0, 26) + '...' : title}</text>
    <!-- Subtitle -->
    <text x="120" y="250" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#94a3b8">ProjectHub Certified Showcase Project</text>
    <!-- Bottom highlight -->
    <line x1="120" y1="340" x2="680" y2="340" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="120" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#38bdf8">Aditya Educational Institutions</text>
    <circle cx="670" cy="370" r="8" fill="${color2}"/>
  </svg>`;
  return Buffer.from(svg).toString('base64');
};

// Minimal valid 1-page sample PDF base64
const samplePdfBase64 =
  'JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA2NQo+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGROCihQcm9qZWN0SHViIFByb2plY3QgRG9jdW1lbnRhdGlvbikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE4IDAwMDAwIG4gCjAwMDAwMDAwNzcgMDAwMDAgbiAKMDAwMDAwMDEzNiAwMDAwMCBuIAowMDAwMDAwMjk5IDAwMDAwIG4gCjAwMDAwMDA0MTUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgowMDAwMDAwNTEyCiUlRU9F';

const sampleUsers = [
  {
    firstName: 'Demo',
    lastName: 'Student',
    email: 'demostudent@adityauniversity.in',
    password: 'DemoUser@123',
  },
  {
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'demo.student@adityauniversity.in',
    password: 'DemoUser@123',
  },
  {
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
  },
  {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: '24m11mc001@adityauniversity.in',
    password: 'DemoUser@123',
  },
];

const sampleProjects = [
  {
    name: 'Rahul Sharma',
    email: '24m11mc001@adityauniversity.in',
    rollno: '24M11MC001',
    title: 'Smart Home IoT Automation System',
    description:
      'An enterprise IoT-based smart home automation hub featuring real-time telemetry, energy conservation algorithms, Voice Assistant integration, and an intuitive mobile dashboard.',
    github: 'https://github.com/rahul-sharma/smart-home-iot',
    projectUrl: 'https://smarthome-demo.projecthub.dev',
    department: 'CSE',
    toolsUsed: ['Arduino', 'React Native', 'Node.js', 'MQTT', 'TailwindCSS'],
    likes: 42,
    color1: '#3b82f6',
    color2: '#1d4ed8',
  },
  {
    name: 'Ananya Verma',
    email: 'ananya.v@adityauniversity.in',
    rollno: '24M11AI015',
    title: 'MediScan AI - Pulmonary Disease Detection',
    description:
      'Deep learning diagnostic assistant that analyzes chest X-rays and CT scans to detect pneumonia and lung abnormalities with 96.4% sensitivity using Vision Transformers.',
    github: 'https://github.com/ananya-ai/mediscan-pulmonary-ai',
    projectUrl: 'https://mediscan.projecthub.dev',
    department: 'AI&ML',
    toolsUsed: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker'],
    likes: 58,
    color1: '#8b5cf6',
    color2: '#6d28d9',
  },
  {
    name: 'Vikram Patel',
    email: 'vikram.p@adityauniversity.in',
    rollno: '24M11IT042',
    title: 'CloudNest - Interactive Cloud Code Runner',
    description:
      'A secure browser-based multi-language code execution engine and collaborative workspace with live pair-programming and instant sandboxed container provisioning.',
    github: 'https://github.com/vikram-it/cloudnest-sandbox',
    projectUrl: 'https://cloudnest.projecthub.dev',
    department: 'IT',
    toolsUsed: ['Next.js', 'Node.js', 'Docker', 'WebSockets', 'Redis'],
    likes: 36,
    color1: '#06b6d4',
    color2: '#0e7490',
  },
  {
    name: 'Pooja Reddy',
    email: 'pooja.r@adityauniversity.in',
    rollno: '24M11EC088',
    title: 'AgriSense - Precision Agriculture IoT Grid',
    description:
      'Solar-powered wireless sensor mesh network monitoring soil nitrogen, moisture levels, and ambient temperature with automated drip irrigation triggers and SMS alerts.',
    github: 'https://github.com/pooja-ece/agrisense-iot',
    projectUrl: 'https://agrisense.projecthub.dev',
    department: 'ECE',
    toolsUsed: ['ESP32', 'LoRaWAN', 'Python', 'Flask', 'Chart.js'],
    likes: 29,
    color1: '#10b981',
    color2: '#047857',
  },
  {
    name: 'Karthik Rao',
    email: 'karthik.r@adityauniversity.in',
    rollno: '24M11ME023',
    title: 'RoboArm - 6-DOF Robotic Arm with Computer Vision',
    description:
      'A 6-axis precision robotic arm with inverse kinematics and OpenCV visual tracking for automated pick-and-place sorting of industrial components.',
    github: 'https://github.com/karthik-mech/roboarm-6dof',
    projectUrl: 'https://roboarm.projecthub.dev',
    department: 'MECH',
    toolsUsed: ['ROS2', 'OpenCV', 'SolidWorks', 'C++', 'Python'],
    likes: 31,
    color1: '#f59e0b',
    color2: '#b45309',
  },
  {
    name: 'Sneha Kulkarni',
    email: 'sneha.k@adityauniversity.in',
    rollno: '24M11CE019',
    title: 'StructuraSafe - Bridge Structural Health Monitor',
    description:
      'Real-time vibration, strain, and acoustic emission monitoring system for civil infrastructure with automated structural damage anomaly detection.',
    github: 'https://github.com/sneha-civil/structurasafe',
    projectUrl: 'https://structurasafe.projecthub.dev',
    department: 'CIVIL',
    toolsUsed: ['MATLAB', 'IoT Sensors', 'Python', 'React', 'PostgreSQL'],
    likes: 25,
    color1: '#ec4899',
    color2: '#be185d',
  },
  {
    name: 'Divya Nambiar',
    email: 'divya.n@adityauniversity.in',
    rollno: '24M11CH009',
    title: 'EcoPurify - Bio-Electrochemical Water Filtration',
    description:
      'Continuous-flow wastewater treatment prototype integrating microbial fuel cells with AI process parameter tuning for zero-energy effluent purification.',
    github: 'https://github.com/divya-chem/ecopurify',
    projectUrl: 'https://ecopurify.projecthub.dev',
    department: 'CHEMICAL',
    toolsUsed: ['Python', 'LabVIEW', 'Scikit-Learn', 'IoT Sensors'],
    likes: 19,
    color1: '#14b8a6',
    color2: '#0f766e',
  },
  {
    name: 'Manoj Kumar',
    email: 'manoj.k@adityauniversity.in',
    rollno: '24M11MB055',
    title: 'FinPulse - Real-time Portfolio Risk & ESG Dashboard',
    description:
      'Predictive quantitative finance engine delivering Value-at-Risk (VaR) analytics, automated portfolio stress-testing, and corporate ESG compliance scoring.',
    github: 'https://github.com/manoj-mba/finpulse-analytics',
    projectUrl: 'https://finpulse.projecthub.dev',
    department: 'MBA',
    toolsUsed: ['Power BI', 'Python', 'SQL', 'FastAPI', 'Pandas'],
    likes: 22,
    color1: '#6366f1',
    color2: '#4338ca',
  },
];

async function seedData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoDB_url);
    console.log('✅ Connected to MongoDB successfully!');

    // 1. Seed Demo Users
    console.log('\n👤 Seeding demo user accounts...');
    const salt = await bcrypt.genSalt(10);

    for (const u of sampleUsers) {
      const cleanEmail = u.email.trim().toLowerCase();
      const existingUser = await User.findOne({ email: cleanEmail });

      if (existingUser) {
        // Update password to ensure it matches DemoUser@123
        const hashedPassword = await bcrypt.hash(u.password, salt);
        existingUser.password = hashedPassword;
        existingUser.firstName = u.firstName;
        existingUser.lastName = u.lastName;
        await existingUser.save();
        console.log(`🔄 Updated user: ${cleanEmail}`);
      } else {
        const hashedPassword = await bcrypt.hash(u.password, salt);
        const newUser = new User({
          firstName: u.firstName,
          lastName: u.lastName,
          email: cleanEmail,
          password: hashedPassword,
        });
        await newUser.save();
        console.log(`✨ Created demo user: ${cleanEmail}`);
      }
    }

    // 2. Seed Sample Projects
    console.log('\n🚀 Seeding sample projects across departments...');

    for (const p of sampleProjects) {
      const existing = await Project.findOne({ title: p.title });
      const imageBase64 = createSvgImage(p.title, p.department, p.color1, p.color2);

      const projectDoc = {
        name: p.name,
        email: p.email.trim().toLowerCase(),
        rollno: p.rollno,
        department: p.department,
        title: p.title,
        description: p.description,
        github: p.github,
        projectUrl: p.projectUrl,
        toolsUsed: p.toolsUsed,
        likes: p.likes,
        imageData: imageBase64,
        imageMimeType: 'image/svg+xml',
        pdfData: samplePdfBase64,
        pdfUrl: '',
        imageUrl: '',
        createdAt: new Date(),
      };

      if (existing) {
        Object.assign(existing, projectDoc);
        await existing.save();
        console.log(`🔄 Updated project: ${p.title} (${p.department})`);
      } else {
        const newProj = new Project(projectDoc);
        await newProj.save();
        console.log(`✨ Added project: ${p.title} (${p.department})`);
      }
    }

    // Summary
    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments();

    console.log('\n=======================================');
    console.log(`🎉 Seeding complete!`);
    console.log(`📊 Total Users in DB: ${totalUsers}`);
    console.log(`📊 Total Projects in DB: ${totalProjects}`);
    console.log('=======================================');
    console.log('\n🔑 Demo Login Credentials:');
    console.log('   Email:    demostudent@adityauniversity.in (or demo.student@adityauniversity.in)');
    console.log('   Password: DemoUser@123\n');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedData();

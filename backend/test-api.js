import fetch from 'node-fetch';

const API_BASE = 'https://projecthub-production-be9d.up.railway.app/api';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test 1: Get all projects
    console.log('1. Testing GET /api/projects');
    const projectsResponse = await fetch(`${API_BASE}/projects`);
    const projects = await projectsResponse.json();
    
    if (projectsResponse.ok) {
      console.log(`✅ Success! Found ${projects.length} projects`);
      
      if (projects.length > 0) {
        const firstProject = projects[0];
        console.log(`📋 First project: ${firstProject.title}`);
        console.log(`🖼️ Has imageData: ${!!firstProject.imageData}`);
        console.log(`📄 Has pdfData: ${!!firstProject.pdfData}`);
        console.log(`📝 Has imageMimeType: ${!!firstProject.imageMimeType}`);
      }
    } else {
      console.log(`❌ Failed: ${projectsResponse.status} - ${projects.error || 'Unknown error'}`);
    }

    // Test 2: Health check
    console.log('\n2. Testing GET /health');
    const healthResponse = await fetch(`${API_BASE.replace('/api', '')}/health`);
    const health = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log(`✅ Health check passed: ${health.status}`);
      console.log(`🗄️ Database: ${health.database}`);
    } else {
      console.log(`❌ Health check failed: ${healthResponse.status}`);
    }

    // Test 3: Test database connection
    console.log('\n3. Testing GET /test-db');
    const dbResponse = await fetch(`${API_BASE.replace('/api', '')}/test-db`);
    const dbTest = await dbResponse.json();
    
    if (dbResponse.ok) {
      console.log(`✅ Database test passed: ${dbTest.message}`);
    } else {
      console.log(`❌ Database test failed: ${dbResponse.status} - ${dbTest.error || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testAPI(); 
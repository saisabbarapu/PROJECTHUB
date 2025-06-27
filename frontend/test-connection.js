#!/usr/bin/env node

const axios = require('axios');

const testUrls = [
  'http://localhost:4000/api',
  'http://192.168.187.84:4000/api'
];

async function testConnection(url) {
  try {
    console.log(`🔍 Testing connection to: ${url}`);
    
    // Test health endpoint
    const healthResponse = await axios.get(`${url.replace('/api', '')}/health`, {
      timeout: 5000
    });
    
    console.log(`✅ Health check passed: ${healthResponse.data.status}`);
    
    // Test API endpoint
    const apiResponse = await axios.get(`${url}/projects`, {
      timeout: 5000
    });
    
    console.log(`✅ API connection successful: ${apiResponse.status} projects found`);
    
    return true;
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('   → Server is not running or not accessible');
    } else if (error.code === 'ENOTFOUND') {
      console.log('   → IP address not found on network');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('   → Connection timed out');
    } else if (error.response) {
      console.log(`   → Server responded with status: ${error.response.status}`);
    }
    
    return false;
  }
}

async function runTests() {
  console.log('🌐 API Connection Tester');
  console.log('========================\n');
  
  const results = [];
  
  for (const url of testUrls) {
    const success = await testConnection(url);
    results.push({ url, success });
    console.log(''); // Empty line for readability
  }
  
  console.log('📊 Test Results:');
  console.log('================');
  
  results.forEach(({ url, success }) => {
    const status = success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${url}`);
  });
  
  console.log('\n💡 Recommendations:');
  
  if (results.some(r => r.success)) {
    console.log('✅ At least one connection is working!');
    const workingUrl = results.find(r => r.success)?.url;
    if (workingUrl) {
      console.log(`   Use: ${workingUrl}`);
    }
  } else {
    console.log('❌ No connections are working.');
    console.log('   → Check if the backend server is running');
    console.log('   → Verify the IP address is correct');
    console.log('   → Check network connectivity');
    console.log('   → Ensure firewall allows the connection');
  }
}

// Run the tests
runTests().catch(console.error); 
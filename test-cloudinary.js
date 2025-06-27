// Test Cloudinary Configuration
import cloudinary from 'cloudinary';

// Your credentials
const config = {
  cloud_name: 'your_cloud_name', // Replace this with your cloud name
  api_key: '419255423438389',
  api_secret: 'DaUhSLkzsk-4Rph6J-_Sol7emZw'
};

// Configure Cloudinary
cloudinary.v2.config(config);

// Test the connection
async function testCloudinary() {
  try {
    console.log('🔍 Testing Cloudinary connection...');
    console.log('📋 Your credentials:');
    console.log('   Cloud Name:', config.cloud_name);
    console.log('   API Key:', config.api_key);
    console.log('   API Secret:', config.api_secret.substring(0, 10) + '...');
    
    // Test API call
    const result = await cloudinary.v2.api.ping();
    console.log('✅ Cloudinary connection successful!');
    console.log('📊 Account info:', result);
    
    // Test upload (optional)
    console.log('\n🚀 Ready to deploy! Your Cloudinary is working.');
    
  } catch (error) {
    console.error('❌ Cloudinary test failed:', error.message);
    console.log('\n💡 To find your cloud name:');
    console.log('1. Go to: https://cloudinary.com/console');
    console.log('2. Sign in to your account');
    console.log('3. Look at the URL: https://cloudinary.com/console/dashboard/YOUR_CLOUD_NAME');
    console.log('4. Replace "your_cloud_name" in this file with your actual cloud name');
  }
}

testCloudinary(); 
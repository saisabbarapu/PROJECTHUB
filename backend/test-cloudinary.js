import cloudinary from 'cloudinary';

// Your actual credentials
const config = {
  cloud_name: 'dr4ine8em',
  api_key: '419255423438389',
  api_secret: 'DaUhSLkzsk-4Rph6J-_Sol7emZw'
};

async function testCloudinary() {
  console.log('🔍 Testing Cloudinary with your credentials...');
  console.log('📋 Cloud Name:', config.cloud_name);
  console.log('📋 API Key:', config.api_key);
  console.log('📋 API Secret:', config.api_secret.substring(0, 10) + '...');
  console.log('\n🧪 Testing connection...\n');

  try {
    cloudinary.v2.config(config);
    const result = await cloudinary.v2.api.ping();
    console.log('✅ SUCCESS! Cloudinary is working perfectly!');
    console.log('📊 Account info:', result);
    console.log('\n🚀 Ready to deploy! Your Cloudinary is configured correctly.');
    console.log('🌍 Your friends will be able to upload images from anywhere!');
    
  } catch (error) {
    console.error('❌ Cloudinary test failed:', error.message);
    console.log('\n💡 Please check your credentials and try again.');
  }
}

testCloudinary(); 
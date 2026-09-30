#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 Simple Railway Deployment Script\n');

// Check if logged in
try {
  execSync('railway whoami', { stdio: 'ignore' });
  console.log('✅ Logged into Railway');
} catch (error) {
  console.log('❌ Not logged into Railway. Please run: railway login');
  process.exit(1);
}

// Initialize project if needed
try {
  console.log('📦 Initializing Railway project...');
  execSync('railway init', { stdio: 'inherit' });
} catch (error) {
  console.log('ℹ️  Project already exists or error occurred');
}

// Deploy
console.log('🚀 Deploying to Railway...');
try {
  execSync('railway up', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');

  // Get the URL
  try {
    const url = execSync('railway domain', { encoding: 'utf8' }).trim();
    console.log(`🌐 Your app is live at: ${url}`);
    console.log(`🔗 API endpoint: ${url}/api`);

    console.log('\n📋 Next steps:');
    console.log('1. Set environment variables in Railway dashboard:');
    console.log('   - MONGODB_URL: Your MongoDB connection string');
    console.log('   - EMAIL_USER: Your Gmail address');
    console.log('   - EMAIL_PASS: Your Gmail app password');
    console.log('   - NODE_ENV: production');
    console.log('2. Update your frontend API URL to:', `${url}/api`);
    console.log('3. Deploy frontend to Vercel (optional)');
    console.log('4. Share the URLs with friends! 🎉');
  } catch (urlError) {
    console.log('⚠️  Could not get domain. Check Railway dashboard for your URL.');
  }
} catch (error) {
  console.log('❌ Deployment failed:', error.message);
  console.log('\n💡 Make sure you have set up environment variables in Railway dashboard.');
  process.exit(1);
}

#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Deploying to Railway...\n');

// Check if Railway CLI is installed
try {
  execSync('railway --version', { stdio: 'ignore' });
  console.log('✅ Railway CLI found');
} catch (error) {
  console.log('❌ Railway CLI not found. Installing...');
  try {
    execSync('npm install -g @railway/cli', { stdio: 'inherit' });
    console.log('✅ Railway CLI installed');
  } catch (installError) {
    console.log('❌ Failed to install Railway CLI. Please install manually:');
    console.log('npm install -g @railway/cli');
    process.exit(1);
  }
}

// Check if user is logged in
try {
  execSync('railway whoami', { stdio: 'ignore' });
  console.log('✅ Logged into Railway');
} catch (error) {
  console.log('❌ Not logged into Railway. Please login:');
  console.log('railway login');
  process.exit(1);
}

// Create Railway project if it doesn't exist
try {
  console.log('📦 Creating Railway project...');
  execSync('railway init', { stdio: 'inherit' });
} catch (error) {
  console.log('ℹ️  Project already exists or error occurred');
}

// Set environment variables
console.log('🔧 Setting environment variables...');
const envVars = ['MONGODB_URL', 'EMAIL_USER', 'EMAIL_PASS', 'NODE_ENV=production'];

envVars.forEach((envVar) => {
  if (envVar.includes('=')) {
    // Static variable
    try {
      execSync(`railway variables set ${envVar}`, { stdio: 'ignore' });
      console.log(`✅ Set ${envVar}`);
    } catch (error) {
      console.log(`⚠️  Could not set ${envVar}`);
    }
  } else {
    // Dynamic variable - prompt user
    console.log(`Please enter value for ${envVar}:`);
    // Note: In a real implementation, you'd use a prompt library
    console.log(`railway variables set ${envVar}=YOUR_VALUE`);
  }
});

// Deploy
console.log('🚀 Deploying...');
try {
  execSync('railway up', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');

  // Get the URL
  const url = execSync('railway domain', { encoding: 'utf8' }).trim();
  console.log(`🌐 Your app is live at: ${url}`);
  console.log(`🔗 API endpoint: ${url}/api`);

  console.log('\n📋 Next steps:');
  console.log('1. Update your frontend API URL to:', `${url}/api`);
  console.log('2. Share the frontend URL with friends');
  console.log('3. No more IP address sharing needed! 🎉');
} catch (error) {
  console.log('❌ Deployment failed:', error.message);
  process.exit(1);
}

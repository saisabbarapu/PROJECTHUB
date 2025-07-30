#!/usr/bin/env node

import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Setting up environment variables for Railway deployment...\n');

const questions = [
  {
    name: 'MONGODB_URL',
    prompt: 'Enter your MongoDB Atlas connection string: ',
    example: 'mongodb+srv://username:password@cluster.mongodb.net/database'
  },
  {
    name: 'EMAIL_USER',
    prompt: 'Enter your Gmail address: ',
    example: 'your-email@gmail.com'
  },
  {
    name: 'EMAIL_PASS',
    prompt: 'Enter your Gmail app password: ',
    example: 'your-app-password'
  }
];

async function askQuestion(question) {
  return new Promise((resolve) => {
    console.log(`\n${question.prompt}`);
    console.log(`Example: ${question.example}`);
    rl.question('', (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnvironment() {
  console.log('Please provide the following information:\n');
  
  const envVars = {};
  
  for (const question of questions) {
    const answer = await askQuestion(question);
    if (answer) {
      envVars[question.name] = answer;
    }
  }
  
  rl.close();
  
  console.log('\n🔧 Setting environment variables in Railway...');
  
  // Set NODE_ENV
  try {
    execSync('railway variables set NODE_ENV=production', { stdio: 'ignore' });
    console.log('✅ Set NODE_ENV=production');
  } catch (error) {
    console.log('⚠️  Could not set NODE_ENV');
  }
  
  // Set other variables
  for (const [key, value] of Object.entries(envVars)) {
    if (value) {
      try {
        execSync(`railway variables set ${key}=${value}`, { stdio: 'ignore' });
        console.log(`✅ Set ${key}`);
      } catch (error) {
        console.log(`⚠️  Could not set ${key}. You may need to set it manually in Railway dashboard.`);
      }
    }
  }
  
  console.log('\n🎉 Environment setup complete!');
  console.log('You can now run: railway up');
}

setupEnvironment().catch(console.error); 
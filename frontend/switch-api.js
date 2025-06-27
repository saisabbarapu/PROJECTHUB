#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.js');

const configurations = {
  local: {
    name: 'Local Development (localhost:4000)',
    config: `// API Configuration
// Modify this file to change the API URL for different environments

const config = {
  // Development - Local
  development: {
    apiUrl: 'http://localhost:4000/api'
  },
  
  // Development - Friend's System
  friendSystem: {
    apiUrl: 'http://192.168.187.84:4000/api'
  },
  
  // Production
  production: {
    apiUrl: '/api'
  }
};

// Get current environment
const getCurrentConfig = () => {
  // Check if environment variable is set
  if (import.meta.env.VITE_API_URL) {
    return { apiUrl: import.meta.env.VITE_API_URL };
  }
  
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // You can change this to 'friendSystem' to use your friend's IP
    return config.development;
  }
  
  // Production fallback
  return config.production;
};

export default config;
export { getCurrentConfig };`
  },
  friend: {
    name: 'Friend\'s System (192.168.187.84:4000)',
    config: `// API Configuration
// Modify this file to change the API URL for different environments

const config = {
  // Development - Local
  development: {
    apiUrl: 'http://localhost:4000/api'
  },
  
  // Development - Friend's System
  friendSystem: {
    apiUrl: 'http://192.168.187.84:4000/api'
  },
  
  // Production
  production: {
    apiUrl: '/api'
  }
};

// Get current environment
const getCurrentConfig = () => {
  // Check if environment variable is set
  if (import.meta.env.VITE_API_URL) {
    return { apiUrl: import.meta.env.VITE_API_URL };
  }
  
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Using friend's system IP
    return config.friendSystem;
  }
  
  // Production fallback
  return config.production;
};

export default config;
export { getCurrentConfig };`
  }
};

function switchConfig(type) {
  if (!configurations[type]) {
    console.error('Invalid configuration type. Available options:');
    Object.keys(configurations).forEach(key => {
      console.log(`  ${key}: ${configurations[key].name}`);
    });
    process.exit(1);
  }

  try {
    fs.writeFileSync(configPath, configurations[type].config);
    console.log(`✅ Switched to: ${configurations[type].name}`);
    console.log('🔄 Please restart your development server for changes to take effect.');
  } catch (error) {
    console.error('❌ Error switching configuration:', error.message);
    process.exit(1);
  }
}

// Get command line argument
const configType = process.argv[2];

if (!configType) {
  console.log('🔧 API Configuration Switcher');
  console.log('');
  console.log('Usage: node switch-api.js <config-type>');
  console.log('');
  console.log('Available configurations:');
  Object.keys(configurations).forEach(key => {
    console.log(`  ${key}: ${configurations[key].name}`);
  });
  console.log('');
  console.log('Examples:');
  console.log('  node switch-api.js local    # Switch to localhost:4000');
  console.log('  node switch-api.js friend   # Switch to friend\'s IP');
} else {
  switchConfig(configType);
} 
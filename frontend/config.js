// API Configuration
// Modify this file to change the API URL for different environments

const config = {
  // Development - Local
  development: {
    apiUrl: 'http://localhost:4000/api'
  },
  
  // Development - Network Access (Your current IP)
  network: {
    apiUrl: 'http://192.168.187.84:4000/api'
  },
  
  // Development - Friend's System (if different)
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
    // Using network IP for cross-device access
    return config.network;
  }
  
  // Production fallback
  return config.production;
};

export default config;
export { getCurrentConfig };
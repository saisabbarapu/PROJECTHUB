import axios from 'axios';

// Use deployed Railway backend URL
const API_BASE_URL = 'https://projecthub-production-be9d.up.railway.app/api';

console.log('API baseURL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL
});

export default api;
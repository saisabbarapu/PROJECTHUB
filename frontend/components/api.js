import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Updated to original backend port
});

export default api;
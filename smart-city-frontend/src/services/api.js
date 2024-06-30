// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this URL as needed
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

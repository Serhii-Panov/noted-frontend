import axios from 'axios';

const RENDER_BACKEND_URL = 'https://noted-backend-h249.onrender.com';

// Server-side axios instance for Route Handlers - calls backend directly
export const api = axios.create({
  baseURL: process.env.API_URL || RENDER_BACKEND_URL,
  withCredentials: true,
});

// Client-side axios instance - uses Next.js rewrites (/api/* -> backend)
const nextProxyServer = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default nextProxyServer;

import axios from 'axios';

const RENDER_BACKEND_URL = 'https://noted-backend-h249.onrender.com';

// Server-side axios instance for Route Handlers - calls backend directly
// Backend has global /api prefix, so include it in baseURL
export const api = axios.create({
  baseURL: process.env.API_URL ? `${process.env.API_URL}/api` : `${RENDER_BACKEND_URL}/api`,
  withCredentials: true,
});

// Client-side axios instance - uses Next.js rewrites (/api/* -> backend)
const nextProxyServer = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default nextProxyServer;

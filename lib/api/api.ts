import axios from 'axios';
const RENDER_BACKEND_URL = 'https://noted-backend-h249.onrender.com';
export const api = axios.create({
  baseURL: process.env.API_URL || RENDER_BACKEND_URL,
  withCredentials: true,
});
const nextProxyServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true,
});

export  default nextProxyServer;

import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
export const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000',
});
const nextProxyServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export  default nextProxyServer;

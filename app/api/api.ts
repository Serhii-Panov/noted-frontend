import axios, {AxiosError} from 'axios';

const RENDER_BACKEND_URL = 'https://noted-backend-h249.onrender.com';
const rawUrl = process.env.API_URL || RENDER_BACKEND_URL;
const cleanBaseUrl = rawUrl.replace(/\/+$/, '').replace(/\/api$/, '');

export type ApiError = AxiosError<{ error: string }>
export const api = axios.create({
  baseURL: `${cleanBaseUrl}/api`,
  withCredentials: true,
});

import axios, {AxiosError} from 'axios';

export type ApiError = AxiosError<{ error: string }>
export const api = axios.create({
  baseURL: process.env.API_URL || 'https://noted-backend-h249.onrender.com',
  withCredentials: true,
});

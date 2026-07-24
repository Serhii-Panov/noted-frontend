import axios, {AxiosError} from 'axios';

export type ApiError = AxiosError<{ error: string }>
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

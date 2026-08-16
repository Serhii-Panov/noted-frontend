import type { User } from '../../types/user';
import { cookies } from 'next/headers';
import type { Note } from "../../types/note";
import { api } from './api';

interface ResponseNoteProps { 
    notes: Note[];
    totalPages: number,
}

export const fetchNotes = async (params = {}) => {
  const cookieStore = await cookies();
  const { data } = await api.get<ResponseNoteProps>('/notes', {
    params, 
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return res;
};


export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

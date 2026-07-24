import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import nextProxyServer from "./api";
import type { ApiError } from "../../../09-auth/app/api/api";

export type TaskStatus = "all" | "done" | "undone";
export type SortOption =
  | "created"
  | "updated"
  | "priority_asc"
  | "priority_desc";

export const toggleNoteStatus = async (
  id: string,
  is_completed: boolean,
): Promise<Note> => {
  return updateNote(id, { is_completed });
};
export const setNotePriority = async (
  id: string,
  priority: number,
): Promise<Note> => {
  return updateNote(id, { priority });
};

export interface FetchNotesParams {
  search?: string;
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  status?: TaskStatus;
  sortBy?: SortOption;
  page: number;
  perPage: number;
  categoryId?: string;
}
export interface CreateNoteParams {
  title: string;
  content: string;
  is_completed: boolean;
  priority: number;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export interface UpdateNote {
  title?: string;
  content?: string;
  tag?: string;
  is_completed?: boolean;
  priority?: number;
}

export interface NoteApiResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams,
  headers?: Record<string, string>,
): Promise<NoteApiResponse> {
  try {
    const { data } = await nextProxyServer.get<NoteApiResponse>("/notes", {
      params: {
        search: params.search,
        tag: params.tag,
        status: params.status,
        sortBy: params.sortBy,
        page: params.page,
        perPage: params.perPage,
      },
      headers: headers,
    });
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes") as ApiError;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const { data } = await nextProxyServer.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching note by id:", error);
    throw new Error("Failed to fetch note by id") as ApiError;
  }
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  try {
    const { data } = await nextProxyServer.post<Note>("/notes", newNote);

    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note") as ApiError;
  }
}

export async function updateNote(
  id: string,
  updatedNote: UpdateNote,
): Promise<Note> {
  try {
    const { data } = await nextProxyServer.patch<Note>(
      `/notes/${id}`,
      updatedNote,
    );
    return data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note") as ApiError;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const { data } = await nextProxyServer.delete<Note>(`/notes/${id}`);

    return data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note") as ApiError;
  }
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextProxyServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextProxyServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
  return true;
};

// export const checkSession = async (): Promise<boolean> => {
//   try {
//     const res = await nextProxyServer.get<CheckSessionRequest>("/auth/session");
//     return res.data.success;
//   } catch (error) {
//     return false;
//   }
// };

export const getMe = async () => {
  return {
    id: "demo-id",
    username: "Demo User",
    email: "demo@example.com",
  };
  // const { data } = await nextProxyServer.get<User>("/users/me");
  // return data;
};

export const logout = async (): Promise<void> => {
  await nextProxyServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextProxyServer.patch<User>("/users/me", payload);
  return res.data;
};

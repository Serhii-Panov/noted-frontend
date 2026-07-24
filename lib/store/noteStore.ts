import { CreateNoteParams } from '@/lib/api/clientApi';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
    draft:CreateNoteParams,
    setDraft: (note:CreateNoteParams) => void,
    clearDraft: () => void
}

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as "Work" | "Personal" | "Meeting" | "Shopping" | "Todo" ,
};


export const useNoteDraftStore = create<NoteDraftStore>()(
persist(
    (set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}),
{
    name: 'note-draft',
    partialize: (state) => ({ draft: state.draft }),
    },
  ),
); 
import React from 'react';
import { Note } from '@/types/note';
import { NoteCard } from '../NoteCard/NoteCard';


interface NoteListProps {
  notes: Note[];
  onRefresh?: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onRefresh }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        <p className="text-gray-500 text-sm font-medium">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id || (note as { _id?: string })._id || `note-${index}`}
          note={note}
          onRefresh={() => {onRefresh?.()}}
        />
      ))}
    </div>
  );
};
export default NoteList;
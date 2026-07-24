import React from 'react';
import { Note } from '@/types/note';
import { toggleNoteStatus, setNotePriority, deleteNote } from '@/lib/api/clientApi';

interface NoteCardProps {
  note: Note;
  onRefresh?: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onRefresh }) => {
  const id = note.id || (note as { _id?: string })._id;

  const handleToggleCompleted = async () => {
    if (!id) return;
    try {
      await toggleNoteStatus(id, !note.is_completed);
      onRefresh?.();
    } catch (err) {
      console.error('Failed to toggle note status:', err);
    }
  };

  const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!id) return;
    try {
      await setNotePriority(id, Number(e.target.value));
      onRefresh?.();
    } catch (err) {
      console.error('Failed to update priority:', err);
    }
  };

  const handleDelete = async () => {
    if (!id){
      console.log(id);
      console.error('Note ID is undefined. Cannot delete note.');
      return;
    }
    try {
      await deleteNote(id);
      onRefresh?.();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div
      className={`p-4 border rounded-xl shadow-sm bg-white transition-all hover:shadow-md ${
        note.is_completed ? 'opacity-60 bg-gray-50 border-gray-200' : 'border-gray-200'
      }`}
    >
      {/* Шапка: Чекбокс + Заголовок + Выбор приоритета */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-base select-none">
          <input
            type="checkbox"
            checked={Boolean(note.is_completed)}
            onChange={handleToggleCompleted}
            className="w-4 h-4 rounded cursor-pointer accent-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <span className={note.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}>
            {note.title}
          </span>
        </label>

        {/* Выбор Приоритета (1–10) */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-500 font-medium">Priority:</span>
          <select
            value={note.priority ?? 5}
            onChange={handlePriorityChange}
            className="border border-gray-300 rounded px-2 py-0.5 text-xs font-bold bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Текст заметки */}
      <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap leading-relaxed">
        {note.content}
      </p>

      {/* Подвал: Тег + Кнопка удаления */}
      <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
        {note.tag ? (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md font-medium capitalize">
            {note.tag}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 hover:underline font-medium transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
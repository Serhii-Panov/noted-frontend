"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { createNote } from "@/lib/api/clientApi";
import type { Note } from "../../types/note";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/all");
  const fieldId = useId();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (data: Note) => {
      clearDraft();
      router.push("/notes/filter/all");
      queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as
      | "Work"
      | "Personal"
      | "Meeting"
      | "Shopping"
      | "Todo";
    const is_completed = formData.get("is_completed") === "on" ? true : false;
    const priority = formData.get("priority") as unknown as number;
    mutate({ title, content, tag, is_completed, priority });
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
          required
        />
      </div>
      <label htmlFor={`${fieldId}-is_completed`}>Completed</label>
      <input
        type="checkbox"
        name="is_completed"
        id={`${fieldId}-is_completed`}
        checked={Boolean(draft?.is_completed)}
        onChange={handleChange}
        className="w-4 h-4 rounded cursor-pointer accent-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <label htmlFor={`${fieldId}-priority`}>Priority</label>
      <select
        id={`${fieldId}-priority`}
        name="priority"
        className={css.select}
        defaultValue={draft?.priority}
        onChange={handleChange}
        required
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

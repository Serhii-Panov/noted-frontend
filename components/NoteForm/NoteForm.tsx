"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { createNote } from "@/lib/api/clientApi";
import type { Note } from "../../types/note";
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
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded shadow-md justify-center items-center"
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-2"
          defaultValue={draft?.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-[800px] p-2"
          defaultValue={draft?.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-2 justify-around items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <label htmlFor={`${fieldId}-priority`}>Priority</label>
          <select
            id={`${fieldId}-priority`}
            name="priority"
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            id={`${fieldId}-tag`}
            name="tag"
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}

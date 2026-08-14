"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, TaskStatus } from "@/lib/api/clientApi";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"; // <-- 1. Импортируем useSearchParams

type Props = {
  params: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo" | undefined;
};

const NotesClient = ({ params }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams(); // <-- 2. Считываем searchParams

  // Достаем статус из URL (например, ?status=undone)
  const statusParam = searchParams.get("status") as TaskStatus | null;
  const status = statusParam === "all" ? undefined : (statusParam ?? undefined);
  const priorityParam = searchParams.get("priority");
  const priority =
    priorityParam && priorityParam !== "all"
      ? Number(priorityParam)
      : undefined;

  const handleChange = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Добавляем status в объект запроса
  const currentQuery = {
    search: searchQuery,
    tag: params,
    status: status,
    priority: priority,
    page: currentPage,
    perPage: 9,
  };

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300,
  );

  const { data } = useQuery({
    queryKey: ["notes", currentQuery], // queryKey обновляется автоматически при смене URL
    queryFn: () => fetchNotes(currentQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  return (
    <div className="w-[90%] max-w-[1280px] mx-auto p-0">
      <header className="mb-4 flex justify-between items-center p-4 border-b border-[#dee2e6] bg-[#f8f9fa]">
        <SearchBox onSearch={updateSearchQuery} searchQuery={searchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={({ selected }) => {
              setCurrentPage(selected + 1);
            }}
          />
        )}
        <Link
          href="/notes/action/create"
          className="px-1.5 py-2 text-base text-white bg-[#0d6efd] border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer"
        >
          Create note +
        </Link>
      </header>
      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} onRefresh={handleChange} />
      )}
      {data?.notes && data.notes.length === 0 && (
        <p>No notes found. Try creating one!</p>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default NotesClient;

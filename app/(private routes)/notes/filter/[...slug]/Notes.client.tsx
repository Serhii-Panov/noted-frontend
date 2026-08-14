"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, TaskStatus, SortOption } from "@/lib/api/clientApi";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Props = {
  params: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo" | undefined;
};

const NotesClient = ({ params }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Считываем фильтры из URL
  const statusParam = searchParams.get("status") as TaskStatus | null;
  const status = statusParam === "all" ? undefined : statusParam ?? undefined;

  const priorityParam = searchParams.get("priority");
  const priority = priorityParam && priorityParam !== "all" ? Number(priorityParam) : undefined;

  // 🌟 Считываем параметр сортировки (по умолчанию "created")
  const sortBy = (searchParams.get("sortBy") as SortOption) || "created";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Универсальная функция для обновления URL-параметров
  const handleSortChange = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortBy", newSort);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleChange = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
  };

  // 3. Формируем объект запроса с sortBy
  const currentQuery = {
    search: searchQuery,
    tag: params,
    status: status,
    priority: priority,
    sortBy: sortBy, // <-- Передаем sortBy в API
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
    queryKey: ["notes", currentQuery],
    queryFn: () => fetchNotes(currentQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  return (
    <div className="w-[90%] max-w-[1280px] mx-auto p-0">
      <header className="mb-4 flex flex-wrap gap-4 justify-between items-center p-4 border-b border-[#dee2e6] bg-[#f8f9fa]">
        <div className="flex items-center gap-4">
          <SearchBox onSearch={updateSearchQuery} searchQuery={searchQuery} />

          {/* 🌟 Селект сортировки */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm bg-white"
          >
            <option value="created">Newest first</option>
            <option value="updated">Recently updated</option>
            <option value="priority_desc">Priority: High to Low (⬇)</option>
            <option value="priority_asc">Priority: Low to High (⬆)</option>
          </select>
        </div>

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
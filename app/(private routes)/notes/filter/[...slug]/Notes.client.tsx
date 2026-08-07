"use client";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  params: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo" | undefined;
};

const NotesClient = ({ params }: Props) => {
  const queryClient = useQueryClient();
  const handleChange = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const currentQuery = {
    search: searchQuery,
    tag: params,
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
        {
          <Link href="/notes/action/create" className="px-1.5 py-2 text-base text-white bg-[#0d6efd] border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer">
            Create note +
          </Link>
        }
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

"use client";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./Notes.client.module.css";
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
    perPage: 10,
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
    <div className={css.app}>
      <header className={css.toolbar}>
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
          <Link href="/notes/action/create" className={css.button}>
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

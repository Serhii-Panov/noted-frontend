"use client";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <div className="max-w-3xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{data?.title}</h2>
            </div>
            <p className="text-[18px] text-[#444] whitespace-pre-wrap">{data?.content}</p>
            <p className="text-sm text-[#444]">{data?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default NoteDetailsClient;

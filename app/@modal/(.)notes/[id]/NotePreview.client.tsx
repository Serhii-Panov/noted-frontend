"use client";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

const NotePreviewClient = () => {
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
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
        <Modal onClose={closeModal}>
          <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{data?.title}</h2>
              </div>
              <p className="text-gray-600">{data?.content}</p>
              <p className="text-sm text-gray-500">{data?.createdAt}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotePreviewClient;

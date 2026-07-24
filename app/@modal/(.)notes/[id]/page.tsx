import { fetchNoteById } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";


type Props = {
  params: Promise<{ id: string }>;
};

const queryClient = new QueryClient();

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient/>
      </HydrationBoundary>
    </div>
  );
};

export default NotePreview;

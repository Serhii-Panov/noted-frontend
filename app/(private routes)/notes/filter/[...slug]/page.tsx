import { cookies } from "next/headers";
import { fetchNotes } from "@/lib/api/clientApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  return {
    title: tag,
    description: `notes by filter: ${tag}`,
    openGraph: {
    title: tag,
    description: `notes by filter: ${tag}`,
    url:`https://notehub.com/app/notes/filter/${tag}`,
    images:[
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub logo"
      }
      ],
      type: 'article'
  }
  };
}


type Props = {
  params: Promise<{slug: string[]}>;
};

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0] as
      | "Work"
      | "Personal"
      | "Meeting"
      | "Shopping"
      | "Todo"
      | undefined;

  const currentQuery = {
    tag: tag,
    page: 1,
    perPage: 10,
  };
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", currentQuery],
      queryFn: () => fetchNotes(currentQuery, { Cookie: cookieHeader }),
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className="w-[90%] max-w-[1280px] mx-auto p-0">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient params={tag} />
      </HydrationBoundary>
    </div>
  );
};
export default Notes;

import { cookies } from "next/headers";
import { fetchNotes, TaskStatus, SortOption } from "@/lib/api/clientApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    status?: TaskStatus;
    priority?: number
    sortBy?: SortOption;
    search?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  
  return {
    title: tag ?? "All Notes",
    description: `notes by filter: ${tag ?? "all"}`,
    openGraph: {
      title: tag ?? "All Notes",
      description: `notes by filter: ${tag ?? "all"}`,
      url: `https://notehub.com/app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notehub logo",
        },
      ],
      type: "article",
    },
  };
}

const Notes = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { status, priority, sortBy, search, page } = await searchParams; // 1. Достаем status из query-параметров

  const tag =
    slug[0] === "all"
      ? undefined
      : (slug[0] as
          | "Work"
          | "Personal"
          | "Meeting"
          | "Shopping"
          | "Todo"
          | undefined);

  // 2. Добавляем status в объект запроса
  const currentQuery = {
    tag: tag,
    status: status === "all" ? undefined : status,
    priority: priority,
    sortBy: sortBy || "created",
    search: search || "",
    page: Number(page) || 1,
    perPage: 10,
  };

  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", currentQuery], // queryKey совпадает с клиентским!
      queryFn: () => fetchNotes(currentQuery, { Cookie: cookieHeader }),
    });
  } catch (error) {
    console.error("Error prefetching notes:", error);
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Если нужно, передаем тег и статус дальше в клиентский компонент */}
        <NotesClient params={tag} />
      </HydrationBoundary>
    </div>
  );
};

export default Notes;
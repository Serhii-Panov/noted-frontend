import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create note",
  description: "Create note for further use",
  openGraph: {
    title:"Create note",
    description:"Create note for further use",
    url:"/notes/action/create",
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


const CreateNote = () => {
  return (
    <main className="flex-1">
      <div className="w-[90%] max-w-[1280px] mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center text-[#1a1a1a]">Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;

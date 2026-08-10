import Link from "next/link";
import Image from "next/image";
import { getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
  openGraph: {
    title: "Profile",
    description: "Profile",
    url: "/",
    siteName: "NoteHub",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt:"Profile"
    }],
    type:'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Profile",
    description: "Profile",
    images:["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
  }
};



const Profile = async () => {
  return (
  <div>
    <p>Page in development</p>
    <Link href="/">Go to Home</Link>
  </div>
)
  const user = await getServerMe();

    
  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-gray-800">Profile Page</h1>
            <Link href="/profile/edit" className="px-4 py-2 bg-[#0d6efd] text-white border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer">
              Edit Profile
            </Link>
          </div>
          <div className="flex flex-col items-center mb-4">
            <Image
              src={user.avatar || "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Name: {user.username}</p>
            <p className="text-lg font-semibold">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;

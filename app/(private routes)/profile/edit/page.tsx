"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUserName] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    if (user) {
      setUserName(user.username ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleSaveUser = async (formData: FormData) => {
    const updatedUsername = (formData.get("username") as string) || username;
    
    try {
      const updatedUser = await updateMe({
        username: updatedUsername,
      });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h1>

          <Image
            src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full mb-6"
            priority
          />

          <form className="space-y-4" action={handleSaveUser}>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                id="username"
                name="username" 
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <p className="text-lg font-semibold text-gray-700">Email: {email}</p>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#0d6efd] text-white border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#6c757d] text-white border-none rounded-sm hover:bg-[#5a6268] transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
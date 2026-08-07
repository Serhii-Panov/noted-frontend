"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

const EditProfile = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/default_avatar.jpg");

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe()
      .then((user) => {
        setUserName(user.username ?? "");
        setEmail(user.email ?? "");
        setAvatar(user.avatar ?? "");
      })
      .catch((err) => console.error("Failed to fetch user", err));
  }, []);

  const handleSaveUser = async (formData: FormData) => {
    const username = formData.get("username") as string;
    try {
      const updatedUser = await updateMe({
        username,
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
          <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>

          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />

          <form className="space-y-4" action={handleSaveUser}>
            <div className="flex flex-col">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <p className="text-lg font-semibold">Email: {email}</p>

            <div className="flex gap-3">
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

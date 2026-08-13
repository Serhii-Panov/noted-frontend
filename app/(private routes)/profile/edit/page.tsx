"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe, updateAvatar } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUserName] = useState(user?.username ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!user) {
    return (
      <main className="flex-1 p-6 max-w-3xl mx-auto">
        <p className="text-gray-500">Loading user profile...</p>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let updatedUser = user;

      // 1. Загружаем аватарку, если выбран файл
      if (selectedFile) {
        updatedUser = await updateAvatar(selectedFile);
      }

      // 2. Обновляем имя, если оно изменилось
      if (username !== user.username) {
        updatedUser = await updateMe({ username });
      }

      if (updatedUser) {
        setUser(updatedUser);
      }
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h1>

          <form key={user.id} className="space-y-6" onSubmit={handleSubmit}>
            <AvatarPicker
              profilePhotoUrl={user.avatar}
              onFileSelect={(file) => setSelectedFile(file)}
            />

            <div className="flex flex-col gap-1 max-w-md">
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

            <p className="text-sm text-gray-600">
              Email: <span className="font-semibold text-gray-800">{user.email}</span>
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer text-sm font-medium"
                onClick={() => router.back()}
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
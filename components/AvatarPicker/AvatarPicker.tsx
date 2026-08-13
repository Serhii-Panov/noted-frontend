"use client";

import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";

type AvatarPickerProps = {
  profilePhotoUrl?: string;
  onFileSelect: (file: File | null) => void;
};

const DEFAULT_AVATAR = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const AvatarPicker = ({ profilePhotoUrl, onFileSelect }: AvatarPickerProps) => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const displayUrl = selectedPreview ?? profilePhotoUrl ?? DEFAULT_AVATAR;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    // 1. Отдаем File родительскому компоненту
    onFileSelect(file);

    // 2. Создаем превью для отображения
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedPreview(DEFAULT_AVATAR);
    onFileSelect(null); // Сбрасываем файл в родительском state
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-start gap-2 mb-4">
      <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden border-2 border-gray-200 shadow-sm group">
        <Image
          src={displayUrl}
          alt="Avatar Preview"
          fill
          sizes="150px"
          className="object-cover"
          priority
        />

        <label
          htmlFor="avatar-file-input"
          className="absolute inset-0 bg-black/40 text-white text-xs font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-center p-2"
        >
          📷 Choose photo
        </label>

        <input
          ref={inputRef}
          id="avatar-file-input"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {displayUrl !== DEFAULT_AVATAR && (
        <button
          type="button"
          onClick={handleRemove}
          className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
        >
          Remove Photo
        </button>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default AvatarPicker;
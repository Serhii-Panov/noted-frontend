"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest, getMe } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import AuthForm from "@/components/AuthForm/AuthForm";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      await login(formValues);
      const currentUser = await getMe();
      if (currentUser) {
        setUser(currentUser);
        router.push("/notes/filter/all");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Error happened",
      );
    }
  };

  return <AuthForm handleSubmit={handleSubmit} error={error} title="Sign in" />;
};

export default SignIn;

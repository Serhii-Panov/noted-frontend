"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  return (
    <main className="flex-1">
      <h1 className="text-2xl font-semibold text-center mb-2 text-[#212529]">Sign up</h1>
      <form className="flex flex-col gap-4 max-w-[400px] mx-10 my-auto p-6 border bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]" action={handleSubmit}>
        <div className="flex flex-col text-sm font-medium text-[#212529]">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 px-2 py-3 text-sm border border-[#ced4da] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd] "
            required
          />
        </div>

        <div className="flex flex-col text-sm font-medium text-[#212529]">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1 px-2 py-3 text-sm border border-[#ced4da] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd] "
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="px-4 py-2 bg-[#0d6efd] text-white border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer">
            Register
          </button>
        </div>
              {error && <p className="text-red-500 text-sm text-center mt-1">{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;

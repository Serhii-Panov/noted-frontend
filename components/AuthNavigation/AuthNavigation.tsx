'use client'
import Link from 'next/link'
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";




 const AuthNav = () => {
 const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    
    router.push("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className="">
        <Link href="/profile" prefetch={false} className="">
          Profile
        </Link>
      </li>

      <li className="flex gap-4 items-center">
        <p className="text-white">{user?.email}</p>
        <button className=" text-white py-2 px-4 rounded hover:bg-white hover:text-black" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className="flex gap-4 items-center">
        <Link href="/sign-in" prefetch={false} className="">
          Log in
        </Link>
      </li>

      <li className="flex gap-4 items-center">
        <Link href="/sign-up" prefetch={false} className="">
          Sign up
        </Link>
      </li>
    </>
  );
 }
 export default AuthNav;
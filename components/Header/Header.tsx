import Link from "next/link";
import AuthNav from "../AuthNavigation/AuthNavigation";
export default function Header() {
  return (
    <header className="flex gap-4 place-content-between content-center items-center py-4 px-8 bg-[#333]">
      <Link className="text-[24px] font-bold text-white" href="/" aria-label="Home">
        Noted
      </Link>
      <nav aria-label="Main Navigation">
        <ul className="flex gap-4 text-[16px] text-white content-center items-center font-bold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNav/>
        </ul>
      </nav>
    </header>
  );
}
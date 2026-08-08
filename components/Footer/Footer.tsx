export default function Footer() {
  return (
 <footer className="p-5 bg-[#f0f0f0] text-center text-[14px] text-[#555] border-t border-[#ddd] mt-auto">
  <div className="container mx-auto">
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
  </div>
</footer>
 );
}


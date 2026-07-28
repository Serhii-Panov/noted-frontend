import Link from "next/link";


const NotesSidebar = () => {
    const tagList = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <div>
      <ul className="flex-col" >
        <li className="p-2">
          <Link href={`/notes/filter/all`} className=" hover:bg-blue-400">All notes
          </Link>
        </li>   
        {tagList.map((tag) => {
            return (
                <li key={tag} className="p-2 hover:bg-blue-400">
                  <Link
                    href={`/notes/filter/${tag}`}
                    className=""
                  >
                    {tag}
                  </Link>
                </li>
            )
        })}
      </ul>
    </div>
  );
};
export default NotesSidebar;

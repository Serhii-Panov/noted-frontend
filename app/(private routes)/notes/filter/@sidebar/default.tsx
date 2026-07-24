import Link from "next/link";
import css from "./NotesSidebar.module.css";

const NotesSidebar = () => {
    const tagList = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>All notes
          </Link>
        </li>   
        {tagList.map((tag) => {
            return (
                <li key={tag} className={css.menuItem}>
                  <Link
                    href={`/notes/filter/${tag}`}
                    className={css.menuLink}
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

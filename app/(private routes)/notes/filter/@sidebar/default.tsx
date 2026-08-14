"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const tagList = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

const NotesSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "all";
  const currentPriority = searchParams.get("priority") ?? "all";

  // Универсальная функция для обновления любого query-параметра
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl);
  };

  // Формирование href для тегов с сохранением всех фильтров
  const getTagHref = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const basePath = `/notes/filter/${tag}`;
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return (
    <aside className="w-64 py-4 pr-4">
      <ul className="flex flex-col gap-4">
        {/* Фильтр по статусу */}
        <li className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Task status
          </label>
          <select
            id="status"
            value={currentStatus}
            onChange={(e) => updateQueryParam("status", e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
          >
            <option value="all">All status</option>
            <option value="undone">Not done</option>
            <option value="done">Done</option>
          </select>
        </li>

        {/* 🌟 НОВЫЙ ФИЛЬТР: Приоритет */}
        <li className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={currentPriority}
            onChange={(e) => updateQueryParam("priority", e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
          >
            <option value="all">All priorities</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
              <option key={p} value={p}>
                Priority {p}
              </option>
            ))}
          </select>
        </li>

        {/* Список тегов */}
        <li>
          <Link
            href={getTagHref("all")}
            className="block p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors text-sm font-medium"
          >
            All notes
          </Link>
        </li>

        {tagList.map((tag) => (
          <li key={tag}>
            <Link
              href={getTagHref(tag)}
              className="block p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors text-sm font-medium"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotesSidebar;
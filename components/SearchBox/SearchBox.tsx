
interface SearchBoxProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  return (
          <input
            className="flex-1 max-w-[240px] px-1.5 py-2 text-base border border-[#ced4da] rounded-sm bg-white text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd]"
            type="text"
            name="query"
            placeholder="Search notes"
            onChange={props.onSearch}
            defaultValue={props.searchQuery}
            />
  );
}
import { Link } from "react-router-dom";
import { ChevronLeft, ListFilter } from "lucide-react";
import SearchBar from "./SearchBar";

export default function SearchNav({ onQueryChange, initialValue, onEnter }) {
  return (
    <>
      <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
        <Link to="/">
          <ChevronLeft size="28" />
        </Link>
        <h1 className="text-2xl font-semibold">Search</h1>
        <ListFilter size="28" />
      </div>

      <SearchBar
        placeholder="Search crops, fish and recipes..."
        onChange={onQueryChange}
        initialValue={initialValue}
        onEnter={onEnter}
      />
    </>
  );
}


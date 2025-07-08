import { ChevronLeft, ListFilter } from "lucide-react";
import SearchBar from "../comps/mini/SearchBar";
import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <div>
      <div className="sticky w-full p-[1rem]  top-0 z-50 bg-white pb-4">
        <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
          <Link to="/">
            <ChevronLeft size="28" />
          </Link>
          <h1 className="text-2xl font-semibold">All Recipes</h1>
          <ListFilter size="28" />
        </div>

        <SearchBar
          placeholder="Search recipes..."
          // onChange={setQuery}
          // onEnter={(q) => setSearchParams({ query: q })}
          // initialValue={initialQuery}
        />
      </div>
    </div>
  );
};

export default Recipes;

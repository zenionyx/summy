// components/SearchBar.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";

export default function SearchBar({ placeholder }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  // grab initial query param if present
  const params = new URLSearchParams(search);
  const initialQuery = params.get("query") || "";

  const [query, setQuery] = useState(initialQuery);

  // keep local state in sync if the URL changes (e.g. hitting back/forward)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearQuery = () => {
    setQuery("");
    navigate(-1); // or navigate('/home') if you want to reset to home
  };

  return (
    <div className="relative w-full mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size="16" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full py-2 pl-12 pr-4 bg-white border border-gray-200 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#90dd6f]"
      />
      {query && (
        <button
          onClick={clearQuery}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          aria-label="Clear search"
        >
          <X />
        </button>
      )}
    </div>
  );
}

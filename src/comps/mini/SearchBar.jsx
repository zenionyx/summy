import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  placeholder,
  onChange,
  onEnter,
  initialValue = "",
}) {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialValue); // sync with URL if user navigates with a query param
  }, [initialValue]);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onChange?.(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      inputRef.current?.blur();
      onEnter?.(query.trim());
    }
  };

  return (
    <div className="relative w-full mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size="16" />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full py-2 pl-12 pr-4 bg-white border border-gray-200 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#90dd6f]"
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
            onChange?.("");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          aria-label="Clear search"
        >
          <X />
        </button>
      )}
    </div>
  );
}

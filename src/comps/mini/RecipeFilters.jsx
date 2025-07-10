// RecipeFilters.jsx
import { useState, useEffect, useRef } from "react";
import { ListFilter } from "lucide-react";

const sortOptions = [
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "sellLowHigh", label: "Low to High Sell Price" },
  { value: "sellHighLow", label: "High to Low Sell Price" },
];

export default function RecipeFilters({ onApply, filters, typeOptions }) {
  const popupRef = useRef();
  const [show, setShow] = useState(false);

  const defaultFilters = {
    sortBy: "az",
    type: "",
    kitchenTier: "",
    healthRange: [10, 230],
    ingredientsCount: "",
  };

  const [tempFilters, setTempFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShow(false);
        if (!appliedFilters) resetTempFilters();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [appliedFilters]);

  const resetTempFilters = () => {
    setTempFilters(defaultFilters);
    setAppliedFilters(null);
    onApply(defaultFilters);
  };

  const handleApply = () => {
    onApply(tempFilters);
    setAppliedFilters(tempFilters);
    setShow(false);
  };

  useEffect(() => {
    if (filters) {
      setTempFilters(filters);
      setAppliedFilters(filters);
    } else {
      resetTempFilters();
    }
  }, [filters]);

  return (
    <div className="relative">
      <button onClick={() => setShow((prev) => !prev)}>
        <ListFilter
          size={28}
          className={` ${show ? "text-mm-pink" : ""} mt-[7px]`}
        />
      </button>

      {show && (
        <div
          ref={popupRef}
          className="absolute right-0 top-10 z-50 w-72 h-96 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            <h3 className="font-semibold text-lg">Filters</h3>

            {/* Sort */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={tempFilters.sortBy}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Type
              </label>
              <select
                value={tempFilters.type}
                onChange={(e) =>
                  setTempFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                <option value="">All</option>
                {typeOptions.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            {/* Kitchen Tier */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Kitchen Tier
              </label>
              <select
                value={tempFilters.kitchenTier}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    kitchenTier: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                <option value="">All</option>
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
              </select>
            </div>

            {/* Health Range */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Health (Recoup)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={10}
                  max={230}
                  value={tempFilters.healthRange[0]}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      healthRange: [
                        Number(e.target.value),
                        prev.healthRange[1],
                      ],
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  min={10}
                  max={230}
                  value={tempFilters.healthRange[1]}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      healthRange: [
                        prev.healthRange[0],
                        Number(e.target.value),
                      ],
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>

            {/* Ingredient Count */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Ingredients Needed
              </label>
              <select
                value={tempFilters.ingredientsCount}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    ingredientsCount: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-200 px-4 py-3 bg-white sticky bottom-0 rounded-b-xl">
            <div className="flex gap-2">
              <button
                onClick={handleApply}
                className="w-full bg-mm-pink text-white font-semibold py-2 rounded-lg"
              >
                Apply Filters
              </button>
              <button
                onClick={resetTempFilters}
                className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ListFilter } from "lucide-react";
const seasons = ["spring", "summer", "fall", "winter"];

const sortOptions = [
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "season", label: "Season" },
  { value: "sellLowHigh", label: "Low to High Sell Price" },
  { value: "sellHighLow", label: "High to Low Sell Price" },
  { value: "seedLowHigh", label: "Low to High Seed Price" },
  { value: "seedHighLow", label: "High to Low Seed Price" },
];

const cropLocations = [
  "Mistria",
  "Sweetwater Farm",
  "The Eastern Road",
  "The Narrows",
  "The Western Ruins",
  "The Beach",
  "The Deep Woods",
  "The Summit",
  "The Manor's Gardens",
];

export default function CropFilters({ onApply, filters }) {
  const popupRef = useRef();
  const [show, setShow] = useState(false);

  const defaultFilters = {
    season: [],
    favourites: false,
    donatable: false,
    location: [],
    sortBy: "az",
    sourceType: "all",
  };

  const [tempFilters, setTempFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Handle outside click
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

  // Reset temp filters
  const resetTempFilters = () => {
    setTempFilters(defaultFilters);
    setAppliedFilters(null);
    onApply(defaultFilters);
  };

  const toggleSeason = (s) => {
    setTempFilters((prev) => ({
      ...prev,
      season: prev.season.includes(s)
        ? prev.season.filter((x) => x !== s)
        : [...prev.season, s],
    }));
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
          className={` ${show ? "text-mm-orange" : ""} mt-[7px]`}
        />
      </button>

      {show && (
        <div
          ref={popupRef}
          className="absolute right-0 top-10 z-50 w-72 h-96 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            <h3 className="font-semibold text-lg mb-2">Filters</h3>

            {/* Season Buttons */}
            <div className="mb-3">
              <label className="font-medium text-gray-700">Season</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {seasons.map((s) => (
                  <button
                    key={s}
                    className={`px-2 py-1 rounded-full text-sm capitalize ${
                      tempFilters.season.includes(s)
                        ? "bg-mm-orange text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => toggleSeason(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Checkboxes */}
            <div className="mb-3 space-y-2">
              {["favourites", "donatable"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      [type]: !prev[type],
                    }))
                  }
                >
                  <div
                    className={`w-4 h-4 rounded-sm border  ${
                      tempFilters[type]
                        ? "bg-mm-orange border-mm-orange"
                        : "bg-white border-gray-400"
                    }`}
                  />
                  <span className="capitalize text-gray-700">{type}</span>
                </label>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="mb-3">
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

            {/* Location Dropdown (Single Select) */}
            <div className="mb-3">
              <label className="block mb-1 font-medium text-gray-700">
                Location
              </label>
              <select
                value={tempFilters.location[0] || ""}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    location: e.target.value ? [e.target.value] : [],
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                <option value="">All</option>
                {cropLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium text-gray-700">
                Source
              </label>
              <select
                value={tempFilters.sourceType}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    sourceType: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white"
              >
                <option value="all">All</option>
                <option value="forageable">Only Forageables</option>
                <option value="buyable">Only Buyable</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-200 px-4 py-3 bg-white sticky bottom-0 rounded-b-xl">
            <div className="flex gap-2">
              <button
                onClick={handleApply}
                className="w-full bg-mm-orange text-white font-semibold py-2 rounded-lg"
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

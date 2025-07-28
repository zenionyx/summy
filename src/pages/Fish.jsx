import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";
import fishes from "../assets/json/fish.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchBar from "../comps/mini/SearchBar";
import FishFilters from "../comps/mini/FishFilters";
import FishDetail from "./FishDetail";
import { ChevronLeft } from "lucide-react";

const Fish = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const season = searchParams.getAll("season");
    const location = searchParams.getAll("location");

    const filtersFromParams = {
      season,
      location,
      donatable: searchParams.get("donatable") === "true",
      favourites: searchParams.get("favourites") === "true",
      type: searchParams.get("type") || "",
      rarity: searchParams.get("rarity") || "",
      weather: searchParams.get("weather") || "",
      size: searchParams.get("size") || "",
      sortBy: searchParams.get("sortBy") || "az",
    };

    setFilters(filtersFromParams);
  }, []);
  

  useEffect(() => {
    if (!id && initialQuery) {
      setQuery("");
      setSearchParams({});
    }
  }, [location.pathname]);

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters);

    const params = new URLSearchParams(searchParams);

    // Clear old multi-value keys
    params.delete("season");
    params.delete("location");

    // Single/multi keys
    if (appliedFilters.sortBy) {
      params.set("sortBy", appliedFilters.sortBy);
    } else {
      params.delete("sortBy");
    }

    if (appliedFilters.donatable) {
      params.set("donatable", "true");
    } else {
      params.delete("donatable");
    }

    if (appliedFilters.favourites) {
      params.set("favourites", "true");
    } else {
      params.delete("favourites");
    }

    if (appliedFilters.type) {
      params.set("type", appliedFilters.type);
    } else {
      params.delete("type");
    }

    if (appliedFilters.rarity) {
      params.set("rarity", appliedFilters.rarity);
    } else {
      params.delete("rarity");
    }

    if (appliedFilters.weather) {
      params.set("weather", appliedFilters.weather);
    } else {
      params.delete("weather");
    }

    if (appliedFilters.size) {
      params.set("size", appliedFilters.size);
    } else {
      params.delete("size");
    }

    // Multi-select arrays
    if (appliedFilters.season?.length) {
      appliedFilters.season.forEach((s) => {
        params.append("season", s);
      });
    }

    if (appliedFilters.location?.length) {
      appliedFilters.location.forEach((loc) => {
        params.append("location", loc);
      });
    }

    setSearchParams(params);
  };
  
  const filteredFish = fishes.filter((fish) =>
    fish.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const applyFilters = (data) => {
    if (!filters) return data;
    let filtered = [...data];

    if (filters.season.length) {
      filtered = filtered.filter((fish) =>
        fish.season?.some((s) => filters.season.includes(s.toLowerCase()))
      );
    }
    if (filters.donatable) {
      filtered = filtered.filter((fish) => fish.donateable);
    }
    if (filters.favourites) {
      filtered = filtered.filter((fish) => fish.isFavourited);
    }
    if (filters.location.length) {
      filtered = filtered.filter((fish) =>
        fish.location?.some((loc) => filters.location.includes(loc))
      );
    }
    if (filters.type) {
      filtered = filtered.filter((fish) => fish.type === filters.type);
    }
    if (filters.rarity) {
      filtered = filtered.filter((fish) => fish.rarity === filters.rarity);
    }
    if (filters.weather) {
      filtered = filtered.filter((fish) =>
        fish.weather?.includes(filters.weather)
      );
    }
    if (filters.size) {
      filtered = filtered.filter((fish) =>
        Array.isArray(fish.size)
          ? fish.size.includes(filters.size)
          : fish.size === filters.size
      );
    }

    switch (filters.sortBy) {
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "sellLowHigh":
        filtered.sort((a, b) => a.sellPrice - b.sellPrice);
        break;
      case "sellHighLow":
        filtered.sort((a, b) => b.sellPrice - a.sellPrice);
        break;
      default:
        break;
    }

    return filtered;
  };

  const fishToShow = query
    ? filteredFish
    : applyFilters(fishes.sort((a, b) => a.name.localeCompare(b.name)));

  useEffect(() => {
    if (!id) {
      setFilters(null);
    }
  }, [id]);

  useEffect(() => {
    if (location.state?.fromDetailPage) {
      setFilters(null);
      setSearchParams({});
    }
  }, [location.state]);

  if (id) return <FishDetail />;

  const getUnique = (key) => [
    ...new Set(
      fishes.flatMap((f) =>
        Array.isArray(f[key]) ? f[key] : f[key] ? [f[key]] : []
      )
    ),
  ];

  return (
    <div>
      <div className="sticky w-full p-[1rem] top-0 z-50 bg-white pb-4">
        <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
          <Link to="/">
            <ChevronLeft size="28" />
          </Link>
          <h1 className="text-2xl font-semibold">All Fish</h1>
          <FishFilters
            onApply={handleFilterApply}
            filters={filters}
            typeOptions={getUnique("type")}
            rarityOptions={getUnique("rarity")}
            weatherOptions={getUnique("weather")}
            sizeOptions={getUnique("size")}
          />
        </div>

        <SearchBar
          placeholder="Search fish..."
          onChange={setQuery}
          onEnter={(q) => setSearchParams({ query: q })}
          initialValue={query}
        />
      </div>

      {fishToShow.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg p-[1rem] pt-1">
          No items found
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-[1rem] pt-1 pb-24">
          {fishToShow.map((fish) => (
            <Link
              key={fish.id}
              to={`/fish/${fish.id}`}
              state={{ from: location.pathname + location.search }}
            >
              <SimpleFoodCard
                id={fish.id}
                name={fish.name}
                icon={fish.image}
                season={fish.season}
                sellPrice={fish.sellPrice}
                isFavourited={fish.isFavourited}
                type="fish"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fish;

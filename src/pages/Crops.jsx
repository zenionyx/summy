import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import CropFilters from "../comps/mini/CropFilters";
import SearchBar from "../comps/mini/SearchBar";
import CropDetail from "./CropDetail";
import { ChevronLeft } from "lucide-react";

export default function Crops() {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (!id && initialQuery) {
      setQuery("");
      setSearchParams({});
    }
  }, [location.pathname]);

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const [filters, setFilters] = useState(null);

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters);

    const params = new URLSearchParams(searchParams);

    // Clear old filter params
    params.delete("season");
    params.delete("location");

    // Set updated ones
    params.set("sortBy", appliedFilters.sortBy || "az");

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

    if (appliedFilters.sourceType && appliedFilters.sourceType !== "all") {
      params.set("sourceType", appliedFilters.sourceType);
    } else {
      params.delete("sourceType");
    }

    if (appliedFilters.season.length > 0) {
      appliedFilters.season.forEach((s) => {
        params.append("season", s);
      });
    }

    if (appliedFilters.location.length > 0) {
      appliedFilters.location.forEach((loc) => {
        params.append("location", loc);
      });
    }

    setSearchParams(params);
  };
  

  const applyFilters = (data) => {
    if (!filters) return data;

    let filtered = [...data];

    // Season
    if (filters.season.length) {
      filtered = filtered.filter((crop) =>
        crop.season?.some((s) => filters.season.includes(s.toLowerCase()))
      );
    }

    // Donatable
    if (filters.donatable) {
      filtered = filtered.filter((crop) => crop.donateable);
    }

    // Favourites (add real logic if available)
    if (filters.favourites) {
      filtered = filtered.filter((crop) => crop.isFavourited === true);
    }

    if (filters.location.length) {
      filtered = filtered.filter(
        (crop) =>
          crop.source === "Foraging" &&
          crop.forageLocation?.some((loc) => filters.location.includes(loc))
      );
    }

    // Source Type (forageable / buyable / all)
    if (filters.sourceType && filters.sourceType !== "all") {
      if (filters.sourceType === "forageable") {
        filtered = filtered.filter((crop) => crop.seedPrice === 0);
      } else if (filters.sourceType === "buyable") {
        filtered = filtered.filter((crop) => crop.seedPrice > 0);
      }
    }

    // Sort
    switch (filters.sortBy) {
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "season":
        const seasonOrder = ["spring", "summer", "fall", "winter"];
        filtered.sort((a, b) => {
          return (
            seasonOrder.indexOf(a.season?.[0]?.toLowerCase()) -
            seasonOrder.indexOf(b.season?.[0]?.toLowerCase())
          );
        });
        break;
      case "sellLowHigh":
        filtered.sort((a, b) => a.sellPrice - b.sellPrice);
        break;
      case "sellHighLow":
        filtered.sort((a, b) => b.sellPrice - a.sellPrice);
        break;
      case "seedLowHigh":
        filtered.sort((a, b) => a.seedPrice - b.seedPrice);
        break;
      case "seedHighLow":
        filtered.sort((a, b) => b.seedPrice - a.seedPrice);
        break;
      default:
        break;
    }

    return filtered;
  };

  const cropsToShow = query
    ? filteredCrops
    : applyFilters(
        filters ? crops : crops.sort((a, b) => a.name.localeCompare(b.name))
      );

  useEffect(() => {
    if (!id) {
      setFilters(null);
    }
  }, [id]);

  useEffect(() => {
    if (location.state?.fromDetailPage) {
    }
  }, [location.state]);

  useEffect(() => {
    const season = searchParams.getAll("season") || [];
    const location = searchParams.getAll("location") || [];
    const donatable = searchParams.get("donatable") === "true";
    const favourites = searchParams.get("favourites") === "true";
    const sortBy = searchParams.get("sortBy") || "az";
    const sourceType = searchParams.get("sourceType") || "all";

    setFilters({
      season,
      location,
      donatable,
      favourites,
      sortBy,
      sourceType,
    });
  }, []);
  

  if (id) return <CropDetail />;

  return (
    <div>
      <div className="sticky w-full p-[1rem]  top-0 z-50 bg-white pb-4">
        <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
          <Link to="/">
            <ChevronLeft size="28" />
          </Link>
          <h1 className="text-2xl font-semibold">All Crops</h1>
          <CropFilters onApply={handleFilterApply} filters={filters} />
        </div>

        <SearchBar
          placeholder="Search crops..."
          onChange={setQuery}
          onEnter={(q) => setSearchParams({ query: q })}
          initialValue={query}
        />
      </div>

      {cropsToShow.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg p-[1rem] pt-1">
          No items found
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-[1rem] pt-1 pb-24">
          {cropsToShow.map((crop) => (
            <Link
              key={crop.id}
              to={`/crop/${crop.id}`}
              state={{ from: location.pathname + location.search }}
            >
              <SimpleFoodCard
                id={crop.id}
                name={crop.name}
                icon={crop.image}
                season={crop.season}
                seedPrice={crop.seedPrice}
                sellPrice={crop.sellPrice}
                isFavourited={crop.isFavourited}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

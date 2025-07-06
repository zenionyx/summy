import { useState, useEffect } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchBar from "../comps/mini/SearchBar";
import CropDetail from "./CropDetail";
import { ChevronLeft, ListFilter } from "lucide-react";

export default function Crops() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  if (id) return <CropDetail />;

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className="p-[1rem]">
      <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
        <Link to="/">
          <ChevronLeft size="28" />
        </Link>
        <h1 className="text-2xl font-semibold">All Crops</h1>
        <ListFilter size="28" />
      </div>

      <SearchBar
        placeholder="Search crops..."
        onChange={setQuery}
        onEnter={(q) => setSearchParams({ query: q })}
        initialValue={initialQuery}
      />

      {query && filteredCrops.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg">No items found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(query ? filteredCrops : crops).map((crop) => (
            <Link key={crop.id} to={`/crops/${crop.id}`}>
              <SimpleFoodCard
                id={crop.id}
                name={crop.name}
                icon={crop.image}
                season={crop.season}
                seedPrice={crop.seedPrice}
                sellPrice={crop.sellPrice}
                isFavorited={false}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

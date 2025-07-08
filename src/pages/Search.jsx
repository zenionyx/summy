import { useState, useEffect } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchNav from "../comps/mini/SearchNav";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const { id } = useParams();

  if (id) return <CropDetail />;

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div>
      <div className="sticky w-full p-[1rem]  top-0 z-50 bg-white pb-4">
        <SearchNav
          onQueryChange={setQuery}
          initialValue={initialQuery}
          onEnter={(newQuery) => {
            setQuery(newQuery);
            setSearchParams({ query: newQuery });
          }}
        />
      </div>

      {query && filteredCrops.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg">No items found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1 p-[1rem]">
          {(query ? filteredCrops : crops).map((crop) => (
            <Link key={crop.id} to={`/crops/${crop.id}`}>
              <SimpleFoodCard
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

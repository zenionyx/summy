import { useState } from "react";
import { useSearchParams, Link, useParams, useLocation } from "react-router-dom";
import crops from "../assets/json/crops.json";
import fish from "../assets/json/fish.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchNav from "../comps/mini/SearchNav";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const location = useLocation();

  const combinedData = [
    ...crops.map((item) => ({ ...item, type: "crop" })),
    ...fish.map((item) => ({ ...item, type: "fish" })),
  ];

  const filteredItems = combinedData.filter((item) =>
    item.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const { id, type } = useParams();

  if (id && type === "crop") return <CropDetail />;
  if (id && type === "fish") return <FishDetail />;

  return (
    <div>
      <div className="sticky w-full p-[1rem] top-0 z-50 bg-white pb-4">
        <SearchNav
          onQueryChange={setQuery}
          initialValue={initialQuery}
          onEnter={(newQuery) => {
            setQuery(newQuery);
            setSearchParams({ query: newQuery });
          }}
        />
      </div>

      {query && filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg">No items found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1 p-[1rem] pb-24">
          {(query ? filteredItems : combinedData)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                to={`/${item.type}/${item.id}`}
                state={{ from: location.pathname + location.search }}
              >
                <SimpleFoodCard
                  name={item.name}
                  icon={item.image}
                  season={item.season}
                  seedPrice={item.seedPrice}
                  sellPrice={item.sellPrice}
                  isFavourited={item.isFavourited}
                  type={item.type}
                />
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

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
    <div className="p-[1rem]">
      <SearchNav
        onQueryChange={setQuery}
        initialValue={initialQuery}
        onEnter={(newQuery) => {
          setQuery(newQuery);
          setSearchParams({ query: newQuery });
        }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(query ? filteredCrops : crops).map((crop) => (
          <Link key={crop.id} to={`/crops/${crop.id}`}>
            <SimpleFoodCard
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
    </div>
  );
}

import { useState } from "react";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchNav from "../comps/mini/SearchNav";

export default function Search() {
  const [query, setQuery] = useState("");

  // Filter crops based on `startsWith`, case-insensitive
  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className="p-[1rem]">
      {/* Top Section */}
      <SearchNav onQueryChange={setQuery} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(query ? filteredCrops : crops).map((crop) => (
          <SimpleFoodCard
            key={crop.id}
            name={crop.name}
            icon={crop.image}
            season={crop.season}
            seedPrice={crop.seedPrice}
            sellPrice={crop.sellPrice}
            isFavorited={false}
          />
        ))}
      </div>
    </div>
  );
}

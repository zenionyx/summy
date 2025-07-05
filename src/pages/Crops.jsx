import { useParams } from "react-router-dom";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchBar from "../comps/mini/SearchBar";
import CropDetail from "./CropDetail";
import { ChevronLeft, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Crops() {
  const { id } = useParams();

  if (id) return <CropDetail />;

  return (
    <div className="p-[1rem]">
      <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
        <Link to="/">
          <ChevronLeft size="28" />
        </Link>
        <h1 className="text-2xl font-semibold">All Crops</h1>
        <ListFilter size="28" />
      </div>

      <SearchBar placeholder="Search crops..."/>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {crops.map((crop) => (
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
    </div>
  );
}

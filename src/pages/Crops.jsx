import { useParams } from "react-router-dom";
import crops from "../assets/json/crops.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import CropDetail from "./CropDetail";
import { Link } from "react-router-dom";

export default function Crops() {
  const { id } = useParams();

  if (id) return <CropDetail />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Crops</h2>

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

import SimpleFoodCard from "./SimpleFoodCard";
import { ChevronRight } from "lucide-react";
import crops from "../../assets/json/crops.json";
import { useParams, Link } from "react-router-dom";

const FavsHomepage = () => {
  const { id } = useParams();
  
    if (id) return <CropDetail />;
  return (
    <>
      <div className="flex gap-1 items-center mb-4 hover:text-[#90dd6f] focus:text-[#90dd6f]">
        <h2 className="text-2xl font-semibold">Favourites</h2>
        <ChevronRight size={22} className="mt-[5px]" />
      </div>

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
    </>
  );
};

export default FavsHomepage;

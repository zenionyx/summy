import SimpleFoodCard from "./SimpleFoodCard";
import { ChevronRight } from "lucide-react";
import crops from "../../assets/json/crops.json";

const FavsHomepage = () => {
  return (
    <>
      <div className="flex gap-1 items-center mb-4 hover:text-[#90dd6f] focus:text-[#90dd6f]">
        <h2 className="text-2xl font-semibold">Favourites</h2>
        <ChevronRight size={22} className="mt-[5px]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {crops.map(({ id, name, image, season, seedPrice, sellPrice }) => (
          <SimpleFoodCard
            key={id}
            id={id}
            name={name}
            icon={image}
            season={season}
            seedPrice={seedPrice}
            sellPrice={sellPrice}
            isFavorited={false}
          />
        ))}
      </div>
    </>
  );
};

export default FavsHomepage;

import SimpleFoodCard from "./SimpleFoodCard";
import { ChevronRight } from "lucide-react";
import crops from "../../assets/json/crops.json";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import CropDetail from "../../pages/CropDetail";

const FavsHomepage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (id) return <CropDetail />;

  // ✨ Dummy logic for now – replace with real favorites filtering
  const favouritedCrops = crops
    .filter((crop) => crop.isFavourited)
    .slice(0, 10);

  return (
    <>
      {/* Title that navigates to /favourites */}
      <div
        className="flex gap-1 items-center mb-4 hover:text-[#90dd6f] cursor-pointer"
        onClick={() => navigate("/favourites")}
      >
        <h2 className="text-2xl font-semibold">Favourites</h2>
        <ChevronRight size={22} className="mt-[5px]" />
      </div>

      {/* Horizontal scroll of favorite cards */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {favouritedCrops.map((crop) => (
          <Link
            key={crop.id}
            to={`/crop/${crop.id}`}
            state={{ from: location.pathname + location.search }}
            className="flex-shrink-0 w-[156px]"
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
    </>
  );
};

export default FavsHomepage;

import SimpleFoodCard from "./SimpleFoodCard";
import Turnip from "../../assets/imgs/Turnip.png";
import { ChevronRight } from "lucide-react";

const FavsHomepage = () => {
  return (
    <>
      <div className="flex gap-1 items-center mb-4 hover:text-[#90dd6f] focus:text-[#90dd6f]">
        <h2 className="text-2xl font-semibold">Favourites</h2>
        <ChevronRight size={22} className="mt-[5px]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <SimpleFoodCard
          name="Turnip"
          icon={Turnip}
          season="spring"
          seedPrice={25}
          sellPrice={40}
          isFavorited={false}
        />
        <SimpleFoodCard
          name="Turnip and Potato Gratin"
          icon="https://fieldsofmistria.wiki.gg/images/3/3f/Turnip_and_potato_gratin.png?bcf8c9&format=original"
          season="spring"
          seedPrice={25}
          sellPrice={40}
          isFavorited={false}
        />
        <SimpleFoodCard
          name="Turnip"
          icon={Turnip}
          season="spring"
          seedPrice={25}
          sellPrice={40}
          isFavorited={false}
        />
      </div>
    </>
  );
};

export default FavsHomepage;

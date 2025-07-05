import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft, Heart, TreePine } from "lucide-react";
import crops from "../assets/json/crops.json";

export default function CropDetail({ isFavorited = false }) {
  const { id } = useParams();
  const crop = crops.find((c) => c.id === id);
  const isForage = crop.seedPrice === 0;
  const noRegrowth = crop.regrowthTime === 0;

  if (!crop) return <p className="mt-4 text-red-500">Crop not found.</p>;

  return (
    <div className="w-full  bg-[#eff6ff]">
      {/* Back Button + Heart Button + Add Button + Crop Image */}
      <section className="w-full flex-x-center items-center flex-col  p-[1rem]">
        <div className="flex justify-between w-full pt-2 h-[64px] pb-4">
          <Link
            to="/crops"
            className="bg-white rounded-full w-10 h-10 flex justify-center items-center pr-[2px]"
          >
            <ChevronLeft size="28" />
          </Link>
          <div className="w-10 h-10 rounded-full  bg-red-100 flex justify-center items-center">
            <Heart
              className={`w-5 h-5 ${
                isFavorited
                  ? "fill-red-400 text-red-400"
                  : "hover:text-red-400 text-white"
              }`}
            />
          </div>
        </div>
        <img src={crop.image} alt={crop.name} className="w-32 h-32 mb-2" />
      </section>

      {/* Details of the Crop */}
      <section className="bg-white px-[1rem] p-5 rounded-t-3xl">
        {/* Title Part */}
        <div className="flex-x-between items-center mb-6 w-full gap-2">
          <h2
            className={`${
              crop.name.length > 14 ? "text-2xl" : "text-3xl"
            } font-bold`}
          >
            {crop.name}
          </h2>

          {isForage ? (
            <p className="font-semibold text-green-200 flex justify-center items-center gap-1 w-8 h-8 bg-green-700 rounded-full">
              <TreePine className="w-5 h-5 " />
            </p>
          ) : (
            <p className="font-semibold text-mm-orange text-right w-24 pt-2">
              {crop.seedPrice}t / seed
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6 text-lg detailList">
          <div>
            <p>Season</p>
            <p>{crop.season}</p>
          </div>
          <div>
            <p>Growth Time</p>
            <p>{crop.growthTime} days</p>
          </div>
          {!noRegrowth && (
            <div>
              <p>Regrowth Time</p>
              <p>{crop.regrowthTime} days</p>
            </div>
          )}
          <div>
            <p>Sell Price</p>
            <p>{crop.sellPrice}t</p>
          </div>
          <div>
            <p>Donatable</p>
            <p>{crop.donateable ? "Yes" : "No"}</p>
          </div>
          <div>
            <p>Museum Set</p>
            <p>{crop.museumSet}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

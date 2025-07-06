import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  TreePine,
  BadgeCent,
  Flower,
  Sun,
  Leaf,
  Snowflake,
} from "lucide-react";
import { useState } from "react";
import crops from "../assets/json/crops.json";
import locations from "../assets/json/locations.json"
import MiniCards from "../comps/mini/MiniCards";

const seasonMap = {
  spring: { icon: Flower, color: "bg-green-100 text-green-700" },
  summer: { icon: Sun, color: "bg-yellow-100 text-yellow-700" },
  fall: { icon: Leaf, color: "bg-orange-100 text-orange-700" },
  winter: { icon: Snowflake, color: "bg-blue-100 text-blue-700" },
};

export default function CropDetail({ isFavorited = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const crop = crops.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState("details");

  if (!crop) return <p className="mt-4 text-red-500">Crop not found.</p>;

  const isForage = crop.seedPrice === 0;
  const noRegrowth = crop.regrowthTime === 0;

  const seasonIcons = Array.isArray(crop.season)
    ? crop.season.map((s) => ({
        ...seasonMap[s.toLowerCase()],
        key: s.toLowerCase(),
      }))
    : [];

  return (
    <div className="w-full bg-[#eff6ff]">
      {/* Back Button + Heart + Image */}
      <section className="w-full flex-x-center items-center flex-col p-[1rem] mb-6">
        <div className="flex justify-between w-full pt-2 h-[64px] pb-4">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/search");
              }
            }}
            className="bg-white rounded-full w-10 h-10 flex justify-center items-center pr-[2px] shadow hover:shadow-md hover:bg-slate-50"
          >
            <ChevronLeft size="28" />
          </button>
          <div className="w-10 h-10 rounded-full bg-red-100 flex justify-center items-center shadow hover:shadow-md">
            <Heart
              className={`w-5 h-5 ${
                isFavorited
                  ? "fill-red-400 text-red-400"
                  : "hover:text-red-400 text-white"
              }`}
            />
          </div>
        </div>
        <img src={crop.image} alt={crop.name} className="w-28 h-28" />
      </section>

      {/* Crop Info Section */}
      <section className="bg-white p-8 pb-36 rounded-t-3xl shadow-up-sm shadow-slate-200 relative">
        <div className="bg-red-500 w-20 h-8 absolute right-2 top-24 myBlur"></div>
        {/* Header Info */}
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
              <TreePine className="w-5 h-5" />
            </p>
          ) : (
            <p className="font-semibold text-mm-orange text-right text-lg w-24 pt-2">
              {crop.seedPrice}t / seed
            </p>
          )}
        </div>

        {/* Mini Nav Section */}
        <section className="flex w-full itemDetailNav gap-4 overflow-x-auto flex-nowrap scrollbar-hide mb-6 pr-16">
          <p
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </p>
          <p
            className={activeTab === "collect" ? "active" : ""}
            onClick={() => setActiveTab("collect")}
          >
            Collect
          </p>
          {isForage && (
            <p
              className={activeTab === "locations" ? "active" : ""}
              onClick={() => setActiveTab("locations")}
            >
              Locations
            </p>
          )}
          <p
            className={activeTab === "recipes" ? "active" : ""}
            onClick={() => setActiveTab("recipes")}
          >
            Recipes
          </p>
        </section>

        <div className="flex flex-col gap-6 text-lg detailList">
          {/* Details Section start */}
          {activeTab === "details" ? (
            <>
              {seasonIcons.length > 0 && (
                <div>
                  <h3>Season</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {seasonIcons.map((s, i) => {
                      const IconComponent = s.icon;
                      return (
                        <div
                          key={i}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium w-fit ${s.color}`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {crop.growthTime != 0 && (
                <div>
                  <h3>Growth Time</h3>
                  <p>{crop.growthTime} days</p>
                </div>
              )}

              {!noRegrowth && (
                <div>
                  <h3>Regrowth Time</h3>
                  <p>{crop.regrowthTime} days</p>
                </div>
              )}

              <div>
                <h3>Sell Price</h3>
                <p className="text-gray-800 flex items-center gap-1">
                  <BadgeCent className="fill-yellow-100 text-yellow-500 w-5" />
                  {crop.sellPrice}t
                </p>
              </div>

              <div>
                <h3>Source</h3>
                <p>{crop.source}</p>
              </div>
            </>
          ) : null}
          {/* Details Section end */}

          {/* Collect Section start */}
          {activeTab === "collect" ? (
            <>
              <div>
                <h3>Donatable</h3>
                <p>{crop.donateable ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3>Museum Set</h3>
                <p>{crop.museumSet}</p>
              </div>
            </>
          ) : null}
          {/* Collect Section start */}

          {/* Location Section start */}
          {activeTab === "locations" && crop.forageLocation?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 justify-start">
              {crop.forageLocation.map((loc, i) => {
                const locationData = locations.find(
                  (l) => l.name.toLowerCase() === loc.toLowerCase()
                );

                return locationData ? (
                  <MiniCards
                    key={i}
                    title={locationData.name}
                    imageURL={locationData.imageURL}
                  />
                ) : (
                  <MiniCards
                    key={i}
                    title={loc}
                    imageURL="https://via.placeholder.com/100?text=No+Image"
                  />
                );
              })}
            </div>
          ) : null}
          {/* Location Section End */}

          {activeTab === "recipes" ? (
            <div>
              <h3>Used In Recipes</h3>
              <p className="italic text-gray-400">Coming soon...</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

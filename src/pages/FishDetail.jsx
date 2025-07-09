import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  BadgeCent,
  Flower,
  Sun,
  Leaf,
  Snowflake,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import fishes from "../assets/json/fish.json";
import locations from "../assets/json/locations.json";
import MiniCards from "../comps/mini/MiniCards";
import ImageModal from "../comps/mini/ImageModal";

const seasonMap = {
  spring: { icon: Flower, color: "bg-green-100 text-green-700" },
  summer: { icon: Sun, color: "bg-yellow-100 text-yellow-700" },
  fall: { icon: Leaf, color: "bg-orange-100 text-orange-700" },
  winter: { icon: Snowflake, color: "bg-blue-100 text-blue-700" },
  all: { icon: RefreshCw, color: "bg-purple-100 text-purple-600" },
};

const weatherIcons = {
  blizzard:
    "https://fieldsofmistria.wiki.gg/images/d/dc/Weather_icon_blizzard.png?df5c8a",
  rain: "https://fieldsofmistria.wiki.gg/images/5/5e/Weather_icon_rain.png?40c8e0",
  rainy:
    "https://fieldsofmistria.wiki.gg/images/1/16/Weather_icon_rainy.png?fbce84",
  thunderstorm:
    "https://fieldsofmistria.wiki.gg/images/0/03/Weather_icon_thunderstorm.png?127145",
  snow: "https://fieldsofmistria.wiki.gg/images/6/67/Weather_icon_snow.png?59db86",
  storm:
    "https://fieldsofmistria.wiki.gg/images/e/ef/Weather_icon_storm.png?421b6d",
  "wind-spring":
    "https://fieldsofmistria.wiki.gg/images/c/ce/Weather_icon_petals.png?3504c9",
  "wind-fall":
    "https://fieldsofmistria.wiki.gg/images/a/a0/Weather_icon_leaves.png?179202",
};

export default function FishDetail({ isFavourited = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const fish = fishes.find((f) => f.id === id);

  const [activeTab, setActiveTab] = useState("details");
  const [modalImage, setModalImage] = useState(null);
  const [sellCalcQty, setSellCalcQty] = useState(1);

  if (!fish) return <p className="mt-4 text-red-500">Fish not found.</p>;

  const seasonIcons = Array.isArray(fish.season)
    ? fish.season.map((s) => ({
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
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
            className="bg-white rounded-full w-10 h-10 flex justify-center items-center pr-[2px] shadow hover:shadow-md hover:bg-slate-50"
          >
            <ChevronLeft size="28" />
          </button>
          <div className="w-10 h-10 rounded-full bg-red-100 flex justify-center items-center shadow hover:shadow-md">
            <Heart
              className={`w-5 h-5 ${
                isFavourited
                  ? "fill-red-400 text-red-400"
                  : "hover:text-red-400 text-white"
              }`}
            />
          </div>
        </div>
        <img src={fish.image} alt={fish.name} className="w-28 h-28" />
      </section>

      {/* Fish Info Section */}
      <section className="bg-white p-8 pb-36 rounded-t-3xl shadow-up-sm shadow-slate-200 relative">
        <div className="bg-red-500 w-20 h-8 absolute right-2 top-24 myBlur"></div>
        {/* Header Info */}
        <div className="flex-x-between items-center mb-6 w-full gap-2">
          <h2
            className={`${
              fish.name.length > 12 ? "text-2xl" : "text-3xl"
            } font-bold`}
          >
            {fish.name}
          </h2>

          <p className="font-semibold text-mm-orange text-right text-lg w-24 pt-2">
            {fish.sellPrice}t / fish
          </p>
        </div>

        {/* Mini Nav Section */}
        <section className="flex w-full itemDetailNav gap-6 overflow-x-auto flex-nowrap scrollbar-hide mb-6 pr-10">
          <p
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </p>
          <p
            className={activeTab === "calculator" ? "active" : ""}
            onClick={() => setActiveTab("calculator")}
          >
            Calculator
          </p>
          <p
            className={activeTab === "collect" ? "active" : ""}
            onClick={() => setActiveTab("collect")}
          >
            Collect
          </p>
          <p
            className={activeTab === "locations" ? "active" : ""}
            onClick={() => setActiveTab("locations")}
          >
            Locations
          </p>
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

              <div>
                <h3>Type</h3>
                <p>{fish.type}</p>
              </div>

              <div>
                <h3>Size</h3>
                <p>{fish.size.charAt(0).toUpperCase() + fish.size.slice(1)}</p>
              </div>

              <div>
                <h3>Rarity</h3>
                <p>
                  {fish.rarity.charAt(0).toUpperCase() + fish.rarity.slice(1)}
                </p>
              </div>

              <div>
                <h3>Weather</h3>
                <div className="flex flex-col gap-1 text-right">
                  {fish.weather.map((w, index) => {
                    const weatherKey = (() => {
                      const lowerW = w.toLowerCase();

                      if (lowerW === "wind") {
                        if (fish.season.includes("spring"))
                          return "wind-spring";
                        if (fish.season.includes("fall")) return "wind-fall";
                        return null; // wind but not in spring or fall — no icon
                      }

                      return lowerW; // standard weather case
                    })();

                    const imageURL = weatherIcons[weatherKey];

                    return (
                      <div
                        key={index}
                        className="flex gap-2 justify-end items-center"
                      >
                        {weatherKey !== "any" && imageURL && (
                          <img src={imageURL} alt={w} className="w-5 h-5" />
                        )}
                        <p>{w.charAt(0).toUpperCase() + w.slice(1)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}
          {/* Details Section end */}

          {/* Calculator Section start */}
          {activeTab === "calculator" ? (
            <div className="flex flex-col gap-6">
              {/* Sell Price Calculator */}
              <div className="w-full">
                <h3 className="font-semibold mb-2">Sell Price</h3>
                <div className="flex items-center justify-between">
                  <p className="flex gap-2">
                    <span>
                      <BadgeCent className="fill-yellow-100 text-yellow-500 w-5" />
                    </span>
                    {fish.sellPrice}t / item
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSellCalcQty((prev) => Math.max(1, prev - 1))
                      }
                      className="w-8 h-8 rounded bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold">
                      {sellCalcQty}
                    </span>
                    <button
                      onClick={() => setSellCalcQty((prev) => prev + 1)}
                      className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-500"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-right text-gray-500">
                  Total: {fish.sellPrice * sellCalcQty}t
                </p>
              </div>
            </div>
          ) : null}
          {/* Calculator Section start */}

          {/* Collect Section start */}
          {activeTab === "collect" ? (
            <>
              <div>
                <h3>Donatable</h3>
                <p>{fish.donateable ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3>Museum Set</h3>
                <p>{fish.museumSet}</p>
              </div>
            </>
          ) : null}
          {/* Collect Section start */}

          {/* Location Section start */}
          {/* FIX */}
          {activeTab === "locations" ? (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  const locationExpansionMap = {
                    pond: ["Mistria", "The Eastern Road", "The Deep Woods"],
                    river: [
                      "My Farm",
                      "Mistria",
                      "The Eastern Road",
                      "The Narrows",
                    ],
                    ocean: [
                      "The Western Ruins",
                      "Sweetwater Farm",
                      "The Beach",
                    ],
                  };

                  const expandedLocations = (
                    Array.isArray(fish.location)
                      ? fish.location
                      : [fish.location]
                  ).flatMap((loc) => {
                    const key = loc.toLowerCase();
                    return locationExpansionMap[key] || [loc];
                  });

                  const uniqueLocations = [...new Set(expandedLocations)];

                  return uniqueLocations.map((loc, i) => {
                    const locationData = locations.find(
                      (l) => l.name.toLowerCase() === loc.toLowerCase()
                    );

                    return locationData ? (
                      <MiniCards
                        key={i}
                        title={locationData.name}
                        imageURL={locationData.imageURL}
                        onClick={() => setModalImage(locationData.imageURL)}
                        type="food"
                      />
                    ) : (
                      <MiniCards
                        key={i}
                        title={loc}
                        imageURL="https://via.placeholder.com/100?text=No+Image"
                      />
                    );
                  });
                })()}
              </div>
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
      {modalImage && (
        <ImageModal imageURL={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
}

import {
  Flower,
  Sun,
  Leaf,
  Snowflake,
  BadgeCent,
  Heart,
  TreePine,
  RefreshCw,
  HeartPlus,
  CookingPot,
} from "lucide-react";

const seasonMap = {
  spring: { icon: Flower, color: "bg-green-100 text-green-700" },
  summer: { icon: Sun, color: "bg-yellow-100 text-yellow-700" },
  fall: { icon: Leaf, color: "bg-orange-100 text-orange-700" },
  winter: { icon: Snowflake, color: "bg-blue-100 text-blue-700" },
  all: { icon: RefreshCw, color: "bg-purple-100 text-purple-600" },
};

export default function SimpleFoodCard({
  name,
  icon,
  season = [],
  seedPrice,
  sellPrice,
  health,
  skillLevel,
  isFavourited = false,
  type = "crop",
}) {
  const isForage = seedPrice === 0;

  return (
    <div className="relative w-full h-[210px] bg-white rounded-2xl shadow-sm shadow-slate-200 border border-slate-200 p-4 py-5 pt-7 flex flex-col justify-between items-center overflow-hidden hover:bg-slate-100 hover:shadow-md hover:shadow-slate-200">
      {/* Image */}
      <img src={icon} alt={name} className="w-12 h-12" />

      {/* Name */}
      <h3
        className={`text-center font-medium mt-2 w-full flex justify-center items-center ${
          name.length >= 18
            ? "text-xs"
            : name.length >= 13
            ? "text-sm"
            : "text-base"
        } line-clamp-2`}
      >
        {name}
      </h3>

      {/* Season Pills */}
      {type === "crop" || type === "fish" ? (
        <div className="flex gap-1 flex-wrap justify-center my-2">
          {season.map((s, i) => {
            const data = seasonMap[s.toLowerCase()];
            if (!data) return null;
            const { icon: Icon, color } = data;

            return (
              <div
                key={i}
                className={`w-6 h-6 rounded-md flex items-center justify-center ${color}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            );
          })}
        </div>
      ) : type === "recipe" ? (
        <div className="flex gap-1 flex-wrap justify-center my-2">
          <div className="bg-lime-100 text-lime-700rounded-md flex items-center justify-center gap-1 p-[2px] px-1">
            <CookingPot className="w-3.5 h-3.5 " />
            <p className="text-sm">{skillLevel}</p>
          </div>
          <div className=" bg-pink-100 text-pink-700  rounded-md flex items-center justify-center gap-1 p-[2px] px-[6px] ">
            <HeartPlus className="w-3.5 h-3.5 " />
            <p className="text-sm ">{health}</p>
          </div>
        </div>
      ) : null}

      {/* Price / Details */}
      {type === "crop" ? (
        <div className="text-center text-base mt-1 flex items-center gap-2 justify-center">
          <p className="font-semibold text-gray-800 flex items-center gap-1">
            <BadgeCent className="fill-yellow-100 text-yellow-500 w-5" />
            {sellPrice}t
          </p>

          <p>·</p>
          {isForage ? (
            <p className="font-semibold text-green-200 flex justify-center items-center gap-1 w-6 h-6 bg-green-700 rounded-full">
              <TreePine className="w-4 h-4" />
            </p>
          ) : (
            <p className="text-gray-500">{seedPrice}t</p>
          )}
        </div>
      ) : type === "fish" || "recipie" ? (
        <p className="font-semibold text-gray-800 flex items-center gap-1">
          <BadgeCent className="fill-yellow-100 text-yellow-500 w-5" />
          {sellPrice}t
        </p>
      ) : null}

      {/* Heart icon */}
      <div className="absolute top-0 right-0 p-2 rounded-bl-xl text-gray-400 bg-red-100">
        <Heart
          className={`w-5 h-5 ${
            isFavourited
              ? "fill-red-400 text-red-400"
              : "hover:text-red-400 text-white"
          }`}
        />
      </div>
    </div>
  );
}

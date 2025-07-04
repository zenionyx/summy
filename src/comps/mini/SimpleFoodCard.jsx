import {
  Flower,
  Sun,
  Leaf,
  Snowflake,
  Heart,
  BadgeCent,
  TreePine,
} from "lucide-react";

const seasonMap = {
  spring: { icon: Flower, color: "bg-green-100 text-green-700" },
  summer: { icon: Sun, color: "bg-yellow-100 text-yellow-700" },
  autumn: { icon: Leaf, color: "bg-orange-100 text-orange-700" },
  winter: { icon: Snowflake, color: "bg-blue-100 text-blue-700" },
};

export default function SimpleFoodCard({
  name,
  icon,
  season,
  seedPrice,
  sellPrice,
  isFavorited = false,
}) {
  const lowerSeason = season?.toLowerCase();
  const seasonInfo = seasonMap[lowerSeason];
  const isForage = seedPrice === 0;

  return (
    <div className="relative w-full h-56 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 py-5 flex flex-col justify-between overflow-hidden hover:bg-slate-100 hover:shadow-md">
      {seasonInfo && (
        <div
          className={`absolute top-0 right-0 p-2 rounded-bl-xl ${seasonInfo.color}`}
        >
          <seasonInfo.icon className="w-5 h-5" />
        </div>
      )}

      <div className="flex justify-center mt-2">
        <img src={icon} alt={name} className="w-22 h-22" />
      </div>

      <h3
        className={`text-center font-medium mt-2 w-full h-10 flex justify-center items-center ${
          name.length > 14 ? "text-base" : "text-xl"
        } line-clamp-2`}
      >
        {name}
      </h3>

      <div className="text-center text-lg mt-1 flex items-center gap-2 justify-center">
        {isForage ? (
          <p className="font-semibold text-green-200 flex justify-center items-center gap-1 w-6 h-6 bg-green-700 rounded-full">
            <TreePine className="w-4 h-4 " />
          </p>
        ) : (
          <p className="font-semibold text-gray-800 flex items-center gap-1">
            <BadgeCent className="fill-yellow-100 text-yellow-500 w-5" />
            {seedPrice}t
          </p>
        )}
        <p>·</p>
        <p className="text-gray-500">{sellPrice}t</p>
      </div>

      <div className="absolute top-0 left-0 p-2 rounded-br-xl text-gray-400 bg-red-100">
        <Heart
          className={`w-5 h-5 ${
            isFavorited
              ? "fill-red-400 text-red-400"
              : "hover:text-red-400 text-white"
          }`}
        />
      </div>
    </div>
  );
}

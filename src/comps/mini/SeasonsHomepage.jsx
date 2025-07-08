import {
  Flower,
  Sun,
  Leaf,
  Snowflake,
} from "lucide-react";

const seasonMap = {
  spring: { icon: Flower, color: "bg-green-100 text-green-700" },
  summer: { icon: Sun, color: "bg-yellow-100 text-yellow-700" },
  fall: { icon: Leaf, color: "bg-orange-100 text-orange-700" },
  winter: { icon: Snowflake, color: "bg-blue-100 text-blue-700" },
};

const SeasonsHomepage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(seasonMap).map(([season, { icon: Icon, color }]) => (
          <div
            key={season}
            className={`flex items-center gap-2 p-4 rounded-xl shadow-sm shadow-slate-100 hover:shadow-md hover:shadow-slate-200 ${color} hover:opacity-90 transition`}
          >
            <Icon className="w-6 h-6" />
            <span className="capitalize font-medium text-lg">{season}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsHomepage;
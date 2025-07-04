import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import crops from "../assets/json/crops.json";

export default function CropDetail() {
  const { id } = useParams();
  const crop = crops.find((c) => c.id === id);

  if (!crop) return <p className="mt-4 text-red-500">Crop not found.</p>;

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
        <Link to="/crops">
          <ChevronLeft size="28" />
        </Link>
        <h1 className="text-2xl font-semibold">Crop Info</h1>
        <div className="w-10 h-10 bg-red-400 rounded-full profilePic"></div>
      </div>

      {/* Inside the box */}
      <section className="p-4  border rounded-xl shadow bg-slate-400 w-full">
        <img src={crop.image} alt={crop.name} className="w-24 h-24 mb-2" />
      </section>

      {/* Outside the box */}
      <section>
        <h2 className="text-xl font-bold mb-2">{crop.name}</h2>
        <p>Season: {crop.season}</p>
        <p>Growth Time: {crop.growthTime} days</p>
        <p>Seed Price: {crop.seedPrice}t</p>
        <p>Sell Price: {crop.sellPrice}t</p>
        <p>Donatable: {crop.donateable ? "Yes" : "No"}</p>
        <p>Museum Set: {crop.museumSet}</p>
      </section>
    </div>
  );
}

import { useParams } from "react-router-dom";
import crops from "../assets/json/crops.json";

export default function CropDetail() {
  const { id } = useParams();
  const crop = crops.find((c) => c.id === id);

  if (!crop) return <p className="mt-4 text-red-500">Crop not found.</p>;

  return (
    <div className="mt-8 p-4 bg-white border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">{crop.name}</h2>
      <img src={crop.image} alt={crop.name} className="w-24 h-24 mb-2" />
      <p>Season: {crop.season}</p>
      <p>Growth Time: {crop.growthTime} days</p>
      <p>Seed Price: {crop.seedPrice}t</p>
      <p>Sell Price: {crop.sellPrice}t</p>
      <p>Donatable: {crop.donateable ? "Yes" : "No"}</p>
      <p>Museum Set: {crop.museumSet}</p>
    </div>
  );
}

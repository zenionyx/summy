import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  BadgeCent, ChevronLeft,
  Heart,
} from "lucide-react";
import { useState } from "react";
import recipes from "../assets/json/recipes.json";
// import MiniCards from "../comps/mini/MiniCards";
import ImageModal from "../comps/mini/ImageModal";

const kitchenTierMap = {
  1: "https://fieldsofmistria.wiki.gg/images/thumb/3/30/Kitchen_level_1.png/30px-Kitchen_level_1.png?493cc1",
  2: "https://fieldsofmistria.wiki.gg/images/thumb/f/fb/Kitchen_level_2.png/30px-Kitchen_level_2.png?48a109",
  3: "https://fieldsofmistria.wiki.gg/images/thumb/6/6c/Kitchen_level_3.png/30px-Kitchen_level_3.png?98d0f7",
};


export default function RecipeDetail({ isFavourited = false }) {
  const location = useLocation();
  const from = location.state?.from || "/search";
  const navigate = useNavigate();
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  const [activeTab, setActiveTab] = useState("details");
  const [modalImage, setModalImage] = useState(null);
  const [sellCalcQty, setSellCalcQty] = useState(1);

  if (!recipe) return <p className="mt-4 text-red-500">Recipe not found.</p>;

  return (
    <div className="w-full bg-[#eff6ff]">
      {/* Back Button + Heart + Image */}
      <section className="w-full flex-x-center items-center flex-col p-[1rem] mb-6">
        <div className="flex justify-between w-full pt-2 h-[64px] pb-4">
          <button
            onClick={() => navigate(from)}
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
        <img src={recipe.image} alt={recipe.name} className="w-28 h-28" />
      </section>

      {/* Recipe Info Section */}
      <section className="bg-white p-8 pb-36 rounded-t-3xl shadow-up-sm shadow-slate-200 relative">
        <div className="bg-red-500 w-20 h-8 absolute right-2 top-24 myBlur"></div>
        {/* Header Info */}
        <div className="flex-x-between items-center mb-6 w-full gap-2">
          <h2
            className={`${
              recipe.name.length > 12 ? "text-2xl" : "text-3xl"
            } font-bold`}
          >
            {recipe.name}
          </h2>

          <p className="font-semibold text-mm-orange text-right text-lg w-24 pt-2">
            {recipe.sellPrice}t / dish
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
            className={activeTab === "indgredients" ? "active" : ""}
            onClick={() => setActiveTab("indgredients")}
          >
            Ingredients
          </p>
          <p
            className={activeTab === "calculator" ? "active" : ""}
            onClick={() => setActiveTab("calculator")}
          >
            Calculator
          </p>
        </section>

        <div className="flex flex-col gap-6 text-lg detailList">
          {/* Details Section start */}
          {activeTab === "details" ? (
            <>
              <div>
                <h3>Category</h3>
                <p>{recipe.type}</p>
              </div>

              <div>
                <h3>Time</h3>
                <p>{recipe.time} min</p>
              </div>

              <div>
                <h3>Recoup</h3>
                <div className="flex gap-2 justify-end items-center">
                  <img
                    src="https://fieldsofmistria.wiki.gg/images/thumb/0/00/Health_bar_icon.png/20px-Health_bar_icon.png?929078"
                    alt="health icon"
                    className="w-5 h-5"
                  />
                  <img
                    src="https://fieldsofmistria.wiki.gg/images/thumb/4/4e/Stamina_bar_icon_good.png/20px-Stamina_bar_icon_good.png?f79558"
                    alt="stamina icon"
                    className="w-5 h-5"
                  />
                  <p>{recipe.health}</p>
                </div>
              </div>

              <div>
                <h3>Skill Level</h3>
                <div className="flex gap-2 justify-end items-center">
                  <img
                    src="https://fieldsofmistria.wiki.gg/images/thumb/a/a7/Skill_icon_cooking.png/20px-Skill_icon_cooking.png?251950"
                    alt="health icon"
                    className="w-5 h-5"
                  />
                  <p>Level {recipe.skillLevel}</p>
                </div>
              </div>

              <div>
                <h3>Kitchen Tier</h3>
                <div className="flex gap-2 justify-end items-center">
                  <img
                    src={kitchenTierMap[recipe.kitchenTier]}
                    alt={`Tier ${recipe.kitchenTier} icon`}
                    className="w-5 h-5"
                  />
                  <p>Tier {recipe.kitchenTier}</p>
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
                    {recipe.sellPrice}t / item
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
                  Total: {recipe.sellPrice * sellCalcQty}t
                </p>
              </div>
            </div>
          ) : null}
          {/* Calculator Section start */}
        </div>
      </section>
      {modalImage && (
        <ImageModal imageURL={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
}

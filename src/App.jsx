import { Routes, Route } from "react-router-dom";
import Layout from "./comps/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Search from "./pages/Search";
import Crops from "./pages/Crops";
import CropDetail from "./pages/CropDetail";
import Fish from "./pages/Fish";
import FishDetail from "./pages/FishDetail";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourites" element={<Favourites />} />

          <Route path="/crops" element={<Crops />} />
          <Route path="/crop/:id" element={<CropDetail />} />

          <Route path="/fish" element={<Fish />} />
          <Route path="/fish/:id" element={<FishDetail />} />

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./comps/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Crops from "./pages/Crops";
import CropDetail  from "./pages/CropDetail";
import Fish from "./pages/Fish";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          <Route path="/crops" element={<Crops />}>
            <Route path=":id" element={<CropDetail />} />
          </Route>

          <Route path="/fish" element={<Fish />}>
            {/* <Route path=":id" element={<FishDetail />} /> */}
          </Route>

          <Route path="/recipes" element={<Recipes />}>
            {/* <Route path=":id" element={<RecipeDetail />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

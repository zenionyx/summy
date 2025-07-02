import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./comps/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Crops from "./pages/Crops";
import Fish from "./pages/Fish";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/crops" element={<Crops/>} />
        <Route path="/fish" element={<Fish/>} />
        <Route path="/recipes" element={<Recipes/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

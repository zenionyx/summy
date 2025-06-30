import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./comps/Layout";
import Home from "./pages/Home";
import Crops from "./pages/Crops";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/crops" element={<Crops/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* ← renders the matched child route */}
      </main>
    </>
  );
}

export default Layout;

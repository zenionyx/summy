// src/components/Navbar.jsx
import React from "react";
import { House, Carrot, Fish, ChefHat, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useScreenSize from "../funcs/useScreenSize";

const navItems = [
  { to: "/", Icon: House, color: "bg-[#90dd6f]" },
  { to: "/search", Icon: Search, color: "bg-[#F2C94C]" },
  { to: "/crops", Icon: Carrot, color: "bg-[#FFA248]" },
  { to: "/fish", Icon: Fish, color: "bg-[#52A6E4]" },
  { to: "/recipes", Icon: ChefHat, color: "bg-[#F898B7]" },
];

function NavDot({ to, Icon, color, isActive, screen }) {
  const isTablet = screen === "tablet";
  const sizeClass = isTablet ? "w-14 h-14" : "w-11 h-11";
  const iconSize = isTablet ? 30 : 24;

  return (
    <Link to={to}>
      <div
        className={[
          sizeClass,
          "rounded-full flex items-center justify-center",
          isActive ? color : "bg-slate-100",
        ].join(" ")}
      >
        <Icon className={isActive ? "text-white" : "text-gray-400"} size={iconSize} />
      </div>
    </Link>
  );
}

export default function Navbar() {
  const screen = useScreenSize();
  const { pathname } = useLocation();

  const isSmall = screen === "phone" || screen === "tablet";
  if (!isSmall) {
    return (
      <nav className="w-full flex justify-evenly bg-blue-50 py-2">
        <a>Logo</a>
        <a>Crops</a>
        <a>Fish</a>
        <a>Recipes</a>
        <a>Login</a>
      </nav>
    );
  }

  const heightClass = screen === "tablet" ? "h-24" : "h-[80px]";

  return (
    <div
      className={`fixed bottom-0 w-full flex justify-around bg-slate-100 ${heightClass} items-center rounded-t-xl`}
    >
      {navItems.map((item) => (
        <NavDot
          key={item.to}
          {...item}
          isActive={pathname === item.to}
          screen={screen}
        />
      ))}
    </div>
  );
}

import { House, Carrot, Fish, ChefHat } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useScreenSize from "../funcs/useScreenSize";

const navItems = [
  { to: "/", Icon: House, color: "bg-[#90dd6f]" },
  { to: "/crops", Icon: Carrot, color: "bg-[#FFA248]" },
  { to: "/fish", Icon: Fish, color: "bg-[#52A6E4]" },
  { to: "/recipes", Icon: ChefHat, color: "bg-[#F898B7]" },
];

const NavDot = ({ to, Icon, color, isActive }) => (
  <Link to={to} key={to}>
    <div
      className={[
        "w-11 h-11 rounded-full flex items-center justify-center",
        isActive ? color : "bg-slate-100",
      ].join(" ")}
    >
      <Icon className={isActive ? "text-white" : "text-gray-400"} />
    </div>
  </Link>
);

export default function Navbar() {
  const screen = useScreenSize();
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

  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 w-full flex justify-around bg-slate-100 h-16 items-center rounded-t-xl">
      {navItems.map((item) => (
        <NavDot key={item.to} {...item} isActive={pathname === item.to} />
      ))}
    </div>
  );
}

import { House, Carrot, Fish, ChefHat, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useScreenSize from "../funcs/useScreenSize";

const navItems = [
  { to: "/", Icon: House, color: "bg-mm-green" },
  { to: "/search", Icon: Search, color: "bg-mm-yellow" },
  { to: "/crops", Icon: Carrot, color: "bg-mm-orange" },
  { to: "/fish", Icon: Fish, color: "bg-mm-blue" },
  { to: "/recipes", Icon: ChefHat, color: "bg-mm-pink" },
];

function NavDot({ to, Icon, color, isActive, screen }) {
  const isTablet = screen === "tablet";
  const sizeClass = isTablet ? "w-16 h-16" : "w-11 h-11";
  const iconSize = isTablet ? 34 : 24;

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
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/crops">Crops</Link>
        <Link to="/fish">Fish</Link>
        <Link to="/recipes">Recipes</Link>
        <a>Login</a>
      </nav>
    );
  }

  const heightClass =
    screen === "tablet" ? "h-32 rounded-t-3xl" : "h-[80px] rounded-t-2xl";

  return (
    <div
      className={`fixed bottom-0 w-full flex justify-around bg-slate-100 ${heightClass} items-center z-50`}
    >
      {navItems.map((item) => (
        <NavDot
          key={item.to}
          {...item}
          isActive={pathname === item.to || pathname.startsWith(item.to + "/")}
          screen={screen}
        />
      ))}
    </div>
  );
}

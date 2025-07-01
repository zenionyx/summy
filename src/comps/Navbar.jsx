import useScreenSize from "../funcs/useScreenSize";
import { Carrot, Fish, ChefHat, House } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SmallNav = () => {
  const { pathname } = useLocation();
  const navItems = [
    { to: "/", Icon: House, activeClass: "bg-[#cb9c73]" },
    { to: "/crops", Icon: Carrot, activeClass: "bg-[#FFA248]" },
    { to: "/fish", Icon: Fish, activeClass: "bg-[#52A6E4]" },
    { to: "/recipes", Icon: ChefHat, activeClass: "bg-[#F898B7]" },
  ];

  const inactiveClass = "text-gray-400";

  return (
    <div className="fixed bottom-0 w-full flex justify-around bg-slate-100 h-16 items-center rounded-t-xl">
      {navItems.map(({ to, Icon, activeClass }) => {
        const isActive = pathname === to;
        return (
          <Link key={to} to={to}>
            <div
              className={`w-11 h-11 rounded-full flex justify-center items-center ${isActive ? activeClass : "bg-slate-100"} `}
            >
              <Icon className={isActive ? "text-white" : "text-gray-400"} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const BigNav = () => {
  return (
    <nav className="w-full flex justify-evenly bg-blue-50 py-2">
      <a>Logo</a>
      <a>Crops</a>
      <a>Fish</a>
      <a>Recipies</a>
      <a>Login</a>
    </nav>
  );
};

const Navbar = () => {
  const screen = useScreenSize();
  const isPhoneOrTablet = screen === "phone" || screen === "tablet";

  return <>{isPhoneOrTablet ? <SmallNav /> : <BigNav />}</>;
};

export default Navbar;

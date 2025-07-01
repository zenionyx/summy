import useScreenSize from "../funcs/useScreenSize";
import { Carrot, Fish, ChefHat, House } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SmallNav2 = () => {
  const { pathname } = useLocation();
  const navItems = [
    { to: "/", Icon: House, activeClass: "text-[#BA8456]" },
    { to: "/crops", Icon: Carrot, activeClass: "text-[#FFA248]" },
    { to: "/fish", Icon: Fish, activeClass: "text-[#52A6E4]" },
    { to: "/recipes", Icon: ChefHat, activeClass: "text-[#F898B7]" },
  ];

  const inactiveClass = "text-gray-400";

  return (
    <div className="fixed bottom-0 w-full flex justify-around bg-slate-100 h-16 items-center rounded-t-xl">
      {navItems.map(({ to, Icon, activeClass }) => {
        const isActive = pathname === to;
        return (
          <Link key={to} to={to}>
            <Icon
              className={isActive ? activeClass : inactiveClass}
            />
          </Link>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const screen = useScreenSize();
  const isPhoneOrTablet = screen === "phone" || screen === "tablet";

  return (
    <>
      {isPhoneOrTablet ? (
        <SmallNav2 />
      ) : (
        <nav className="w-full flex justify-evenly bg-blue-50 py-2">
          <a>Logo</a>
          <a>Crops</a>
          <a>Fish</a>
          <a>Recipies</a>
          <a>Login</a>
        </nav>
      )}
    </>
  );
};

export default Navbar;

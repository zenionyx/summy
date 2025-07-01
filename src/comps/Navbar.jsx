import useScreenSize from "../funcs/useScreenSize";
import { Menu, Carrot, Fish, ChefHat, House } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import turnipImg from "../assets/imgs/Turnip.webp";
import homeImg from "../assets/imgs/home.png";
import BonitoImg from "../assets/imgs/Bonito.png";
import cookingPot from "../assets/imgs/CookingPot.png";

const SmallNav = () => {
  const [isShownSubMenu, setIsShownSubMenu] = useState(false);
  const toggleSubMenu = useCallback(() => {
    setIsShownSubMenu((prev) => !prev);
  }, []);

  // Sub-menus
  const items = [
    { to: "/", img: homeImg, alt: "Home" },
    { to: "/crops", img: turnipImg, alt: "Crops" },
    { to: "/fish", img: BonitoImg, alt: "Fish" },
    { to: "/recipes", img: cookingPot, alt: "Recipes" },
  ];

  // Shared classes
  const btnBase = "fixed bottom-8 right-6 z-50";
  const circleBtn =
    "w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center";
  const submenu = `
    absolute bottom-full right-0 mb-2
    p-2 rounded z-50
    flex flex-col-reverse gap-4
  `;
  const linkBtn = "FoMBtn1 flex items-center justify-center";

  return (
    <div className={btnBase}>
      <div className="relative">
        <button onClick={toggleSubMenu} className={circleBtn}>
          <Menu className="w-10 h-10" />
        </button>

        {isShownSubMenu && (
          <div className={submenu}>
            {items.map(({ to, img, alt }) => (
              <Link key={to} to={to} className={linkBtn}>
                <img src={img} alt={alt} className="w-8 h-8 object-contain" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SmallNav2 = () => {
  return (
    <>
      <div className="w-full flex justify-around bg-slate-200 h-14 items-center fixed bottom-0 rounded-t-xl">
        <Link to="/">
          <House />
        </Link>
        
        <Link to="/crops">
          <Carrot />
        </Link>

        <Link to="/fish">
          <Fish />
        </Link>

        <Link to="/recipes">
          <ChefHat />
        </Link>
      </div>
    </>
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

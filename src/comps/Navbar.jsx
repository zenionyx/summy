import useScreenSize from "../funcs/useScreenSize";
import { Menu } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const SmallNav = () => {
  const [isShownSubMenu, setIsShownSubMenu] = useState(false);

  const showSubMenu = useCallback(() => {
    setIsShownSubMenu((prev) => !prev);
  }, []);

  return (
    <>
      {/* <nav className="bg-blue-200 w-14 h-14 flex justify-center items-center fixed bottom-4 right-4 z-50 rounded-full">
        <Menu onClick={showSubMenu} />

        {isShownSubMenu && <div>Hello</div>}
      </nav> */}

      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative ">
          <button
            onClick={showSubMenu}
            className="w-14 h-14 bg-blue-200 rounded-full flex justify-center items-center"
          >
            <Menu />
          </button>

          {isShownSubMenu && (
            <div className=" absolute bottom-full right-0 mb-2 bg-white w-fit rounded z-10 flex flex-col-reverse gap-4">
              <Link to="/" className="FoMBtn1 flex items-center justify-center">
                <img className="special" src="../src/assets/imgs/home.png" alt="" />
              </Link>
              <Link to="/crops" className="FoMBtn1 flex items-center justify-center">
                <img src="../src/assets/imgs/Turnip.webp" alt="" />
              </Link>
            </div>
          )}
        </div>
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
        <SmallNav />
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

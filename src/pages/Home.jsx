import { useNavigate } from "react-router-dom";
import SearchBar from "../comps/mini/SearchBar";
import HomeNav from "../comps/mini/HomeNav";
import FavsHomepage from "../comps/mini/FavsHomepage";
import SeasonsHomepage from "../comps/mini/SeasonsHomepage";

const Home = () => {
  const navigate = useNavigate();

  const handleEnter = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="p-[1rem] pb-36">
      {/* Top Section */}
      <HomeNav />

      {/* Search bar */}
      <SearchBar
        placeholder="Search crops, fish and recipes..."
        onEnter={handleEnter}
      />

      {/* Prep Lists */}
      <section></section>

      {/* Favourites Section */}
      <section>
        <FavsHomepage />
      </section>

      {/* Seasonal Lists */}
      <section className="mt-6">
        <SeasonsHomepage />
      </section>

      {/* Recently Viewed */}
      <section></section>
    </div>
  );
};

export default Home;

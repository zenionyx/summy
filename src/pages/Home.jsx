import SearchBar from "../comps/mini/SearchBar";
import HomeNav from "../comps/mini/HomeNav";
import FavsHomepage from "../comps/mini/FavsHomepage";

const Home = () => {
  return (
    <div className="p-[1rem]">
      {/* Top Section */}
      <HomeNav />

      {/* Search bar */}
      <SearchBar placeholder="Search crops, fish and recipies..." />

      {/* Prep Lists */}
      <section></section>

      {/* Favourites Section */}
      <section>
        <FavsHomepage />
        <FavsHomepage />
      </section>

      {/* Seasonal Lists */}
      <section></section>

      {/* Recently Viewed */}
      <section></section>
    </div>
  );
};

export default Home;

import SearchBar from "../comps/mini/SearchBar";
import HomeNav from "../comps/mini/HomeNav";
import FavsHomepage from "../comps/mini/FavsHomepage";

const Home = () => {
  return (
    <div>
      {/* Top Section */}
      <HomeNav />

      {/* Search bar */}
      <SearchBar />

      {/* Prep Lists */}
      <section></section>

      {/* Favourites Section */}
      <section>
        <FavsHomepage/>
      </section>

      {/* Seasonal Lists */}
      <section></section>

      {/* Recently Viewed */}
      <section></section>
    </div>
  );
};

export default Home;

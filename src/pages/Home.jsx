import { Menu, ClipboardList } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Top Section */}
      <div className="w-full flex items-center justify-between text-gray-600">
        <Menu size="30" />
        <div className="flex gap-4  items-center">
          <ClipboardList size="30" />
          {/* profile pic */}
          <div className="w-10 h-10 bg-red-400 rounded-full profilePic"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section></section>

      {/* Search bar */}
      <section></section>

      {/* Prep Lists */}
      <section></section>

      {/* Favourites Section */}
      <section></section>

      {/* Seasonal Lists */}
      <section></section>

      {/* Recently Viewed */}
      <section></section>
    </div>
  );
};

export default Home;

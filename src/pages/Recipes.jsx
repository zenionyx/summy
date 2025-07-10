import { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";
import recipes from "../assets/json/recipes.json";
import SimpleFoodCard from "../comps/mini/SimpleFoodCard";
import SearchBar from "../comps/mini/SearchBar";
import RecipeFilters from "../comps/mini/RecipeFilters";
import RecipeDetail from "./RecipeDetail";
import { ChevronLeft } from "lucide-react";

const Recipes = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    if (!id && initialQuery) {
      setQuery("");
      setSearchParams({});
    }
  }, [location.pathname]);

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters);

    const params = new URLSearchParams(searchParams);

    // Convert filter object to URL params
    if (appliedFilters.sortBy) params.set("sortBy", appliedFilters.sortBy);
    if (appliedFilters.type) params.set("type", appliedFilters.type);
    if (appliedFilters.kitchenTier)
      params.set("kitchenTier", appliedFilters.kitchenTier);
    if (appliedFilters.healthRange) {
      params.set("healthMin", appliedFilters.healthRange[0]);
      params.set("healthMax", appliedFilters.healthRange[1]);
    }
    if (appliedFilters.ingredientsCount)
      params.set("ingredientsCount", appliedFilters.ingredientsCount);

    setSearchParams(params);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().startsWith(query.toLowerCase())
  );

  const applyFilters = (data) => {
    if (!filters) return data;

    let filtered = [...data];

    if (filters.type) {
      filtered = filtered.filter((r) => r.type === filters.type);
    }

    if (filters.kitchenTier) {
      filtered = filtered.filter(
        (r) => r.kitchenTier === parseInt(filters.kitchenTier)
      );
    }

    if (filters.healthRange && filters.healthRange.length === 2) {
      const [min, max] = filters.healthRange;
      filtered = filtered.filter((r) => r.health >= min && r.health <= max);
    }

    if (filters.ingredientsCount) {
      filtered = filtered.filter(
        (r) =>
          Array.isArray(r.ingredients) &&
          r.ingredients.length === parseInt(filters.ingredientsCount)
      );
    }

    switch (filters.sortBy) {
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "sellLowHigh":
        filtered.sort((a, b) => a.sellPrice - b.sellPrice);
        break;
      case "sellHighLow":
        filtered.sort((a, b) => b.sellPrice - a.sellPrice);
        break;
      default:
        break;
    }

    return filtered;
  };

  const recipesToShow = query
    ? filteredRecipes
    : applyFilters(
        filters ? recipes : recipes.sort((a, b) => a.name.localeCompare(b.name))
      );

      useEffect(() => {
        if (!id) {
          const hasFilterParams = [...searchParams.keys()].some((key) =>
            [
              "type",
              "kitchenTier",
              "healthMin",
              "healthMax",
              "ingredientsCount",
              "sortBy",
              "season",
              "location",
              "donatable",
              "favourites",
              "sourceType",
              "rarity",
              "weather",
              "size",
            ].includes(key)
          );

          if (!hasFilterParams) {
            setFilters(null);
          }
        }
      }, [id, searchParams]);
      

  useEffect(() => {
    if (location.state?.fromDetailPage) {
    }
  }, [location.state]);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy") || "az";
    const type = searchParams.get("type") || "";
    const kitchenTier = searchParams.get("kitchenTier") || "";
    const healthMin = searchParams.get("healthMin");
    const healthMax = searchParams.get("healthMax");
    const ingredientsCount = searchParams.get("ingredientsCount") || "";

    const healthRange =
      healthMin && healthMax
        ? [Number(healthMin), Number(healthMax)]
        : [10, 230];

    setFilters({
      sortBy,
      type,
      kitchenTier,
      healthRange,
      ingredientsCount,
    });
  }, []); // only run on mount

  if (id) return <RecipeDetail />;

  const getUnique = (key) => [
    ...new Set(
      recipes.flatMap((r) =>
        Array.isArray(r[key]) ? r[key] : r[key] ? [r[key]] : []
      )
    ),
  ];

  return (
    <div>
      <div className="sticky w-full p-[1rem] top-0 z-50 bg-white pb-4">
        <div className="w-full flex items-center justify-between text-gray-600 pt-2 h-[64px] pb-4">
          <Link to="/">
            <ChevronLeft size="28" />
          </Link>
          <h1 className="text-2xl font-semibold">All Recipes</h1>
          <RecipeFilters
            onApply={handleFilterApply}
            filters={filters}
            typeOptions={getUnique("type")}
          />
        </div>

        <SearchBar
          placeholder="Search recipes..."
          onChange={setQuery}
          onEnter={(q) => setSearchParams({ query: q })}
          initialValue={query}
        />
      </div>

      {recipesToShow.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 text-lg p-[1rem] pt-1">
          No items found
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-[1rem] pt-1 pb-24">
          {recipesToShow.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              state={{ from: location.pathname + location.search }}
            >
              <SimpleFoodCard
                id={recipe.id}
                name={recipe.name}
                icon={recipe.image}
                sellPrice={recipe.sellPrice}
                skillLevel={recipe.skillLevel}
                health={recipe.health}
                isFavourited={recipe.isFavourited}
                type="recipe"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;

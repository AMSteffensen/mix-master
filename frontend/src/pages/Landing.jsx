import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

// Access URLs from environment variables
const cocktailSearchUrl = import.meta.env.VITE_COCKTAIL_SEARCH_URL;
const landingCocktailsUrl = import.meta.env.VITE_COCKTAIL_POPULAR_URL;

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["cocktails", searchTerm || "margarita"],
    queryFn: async () => {
      const url = searchTerm
        ? `${cocktailSearchUrl}${searchTerm}`
        : landingCocktailsUrl;
      const response = await axios.get(url);
      return response.data.drinks;
    },
    staleTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");

    // Prefetch data based on search term or popular drinks
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

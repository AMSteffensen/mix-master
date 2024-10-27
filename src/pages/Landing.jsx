import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "margarita";

  // Update this URL to point to your local Express server
  const response = await axios.get(
    `http://localhost:3000/api/cocktails?search=${searchTerm}`
  );
  return { drinks: response.data, searchTerm };
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

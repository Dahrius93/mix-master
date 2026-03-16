import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// eseguito prima di renderizzare il componente
// ma anche al cambio URL come submit form
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "a";
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  return { drinks: response.data.drinks, searchTerm }; // ritornare sempre qualcosa per evitare undefined
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  // const data = useLoaderData(); ritorna un oggetto con tutte le proprietà restituite dalla funzione loader, in questo caso { drinks, searchTerm }
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

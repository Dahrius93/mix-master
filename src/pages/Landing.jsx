import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader = async () => {
  const searchTerm = "a"; // se termine vuoto non restituisce nulla, se una qualsiasi lettera restituisce tutto
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  return { drinks: response.data.drinks, searchTerm }; // ritornare sempre qualcosa per evitare undefined
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  // const data = useLoaderData(); ritorna un oggetto con tutte le proprietà restituite dalla funzione loader, in questo caso { drinks, searchTerm }
  return (
    <>
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// eseguito prima di renderizzare il componente
// ma anche al cambio URL come submit form
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "a";
  // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`); // lo commento perchè utilizzerò useQuery
  //return { drinks: response.data.drinks, searchTerm }; // ritornare sempre qualcosa per evitare undefined
  return { searchTerm }; // ritorno solo searchTerm perchè i dati li gestirò con useQuery all'interno del componente, in questo modo la query sarà refetchata automaticamente al cambio URL senza dover rifare tutta la logica di fetch nella funzione loader
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks, isLoading } = useQuery(
    searchCocktailsQuery(searchTerm),
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>Loading...</h4>;
  }

  // const data = useLoaderData(); ritorna un oggetto con tutte le proprietà restituite dalla funzione loader, in questo caso { drinks, searchTerm }
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

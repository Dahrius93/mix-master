import { useLoaderData } from "react-router-dom";
import axios from "axios";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader = async () => {
  const searchTerm = "a";
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  return { drinks: response.data.drinks, searchTerm };
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  // const data = useLoaderData(); ritorna un oggetto con tutte le proprietà restituite dalla funzione loader, in questo caso { drinks, searchTerm }
  console.log(drinks);
  return <h1>Landing</h1>;
};

export default Landing;

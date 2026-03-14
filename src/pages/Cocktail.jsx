import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);

  // if (!data) {
  //   throw new Error("No cocktail found");
  // oppure----->
  // if (!data) return <h2>something went wrong...</h2>
  // }
  // oppure----->
  // if (!data) return <Navigate to="/" />; pert tornare alla home
  // comunque errore mostrato su singlePageError.jsx

  return { id, data }; // ritorna un oggetto con la proprietà cocktail, che contiene i dati del cocktail restituiti dall'API
};

const Cocktail = () => {
  const { id, data } = useLoaderData();
  const singleDrink = data.drinks[0];
  console.log(singleDrink);

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink; // destrutturiamo l'oggetto singleDrink per ottenere le proprietà che ci interessano, e le rinominiamo per renderle più comprensibili

  // const ingredients = [];
  // for (let i = 1; i <= 15; i++) {
  //   const ingredient = singleDrink[`strIngredient${i}`];
  //   if (ingredient) {
  //     ingredients.push(ingredient);
  //   }
  // }

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null,
    )
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={index}>
                  {item}
                  {index < validIngredients.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;

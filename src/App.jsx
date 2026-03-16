import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";

// URL: /about

// ┌─────────────────────────┐
// │  HomeLayout (path: "/") │
// │  ┌───────────────────┐  │
// │  │  <nav>navbar</nav>│  │
// │  └───────────────────┘  │
// │  ┌───────────────────┐  │
// │  │    <Outlet />     │  │
// │  │  ┌─────────────┐  │  │
// │  │  │   <About /> │  │  │
// │  │  └─────────────┘  │  │
// │  └───────────────────┘  │
// └─────────────────────────┘

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        //path: "/landing",
        index: true, // ← questa è la route di default, corrisponde a "/"
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader, // ← questa è la funzione che viene eseguita prima di renderizzare il componente, i dati restituiti vengono passati al componente tramite useLoaderData
      },
      {
        path: "/cocktail/:id", // :id è un parametro dinamico, corrisponde a qualsiasi valore dopo "/cocktail/"
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader,
        element: <Cocktail />,
      },
      {
        path: "/newsletter",
        element: <Newsletter />,
        action: newsletterAction, // ← questa è la funzione che viene eseguita quando viene inviato un form con method="POST" all'interno del componente Newsletter, i dati restituiti vengono passati al componente tramite useActionData
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

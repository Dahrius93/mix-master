import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";

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
        loader: landingLoader, // ← questa è la funzione che viene eseguita prima di renderizzare il componente, i dati restituiti vengono passati al componente tramite useLoaderData
      },
      {
        path: "/cocktail",
        element: <Cocktail />,
      },
      {
        path: "/newsletter",
        element: <Newsletter />,
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

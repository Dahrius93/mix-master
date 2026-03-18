import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

// general page layout
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

const queryClient = new QueryClient({
  // questa è la configurazione di default per tutte le query,
  // in questo caso tutte le query saranno considerate "fresche" per 5 minuti,
  // quindi non verranno refetchate automaticamente se vengono richiamate
  // entro 5 minuti dall'ultima volta che sono state fetchate
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        loader: landingLoader(queryClient), // ← questa è la funzione che viene eseguita prima di renderizzare il componente, i dati restituiti vengono passati al componente tramite useLoaderData
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

import { createBrowserRouter } from "react-router-dom";

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
} from "./pages";

// router example
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <h2>home page</h2>,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cocktail",
    element: <Cocktail />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/newsletter",
    element: <Newsletter />,
  },
]);

const App = () => {
  return <router.Provider router={router} />;
};
export default App;

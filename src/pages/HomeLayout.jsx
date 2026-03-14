//import { Link } from "react-router-dom";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

// HomeLayout è il componente padre che mostra gli altri elementi
//
// URL: /about
//
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

const HomeLayout = () => {
  const navigation = useNavigation(); // useNavigation è un hook che restituisce un oggetto con informazioni sulla navigazione, in questo caso lo usiamo per mostrare un loading spinner quando la navigazione è in corso
  const isPageLoading = navigation.state === "loading";
  const value = "some value"; // esempio di valore da passare ai componenti figli tramite context
  return (
    <>
      <Navbar /> {/* ← sempre presente */}
      <section className="page">
        {isPageLoading ? (
          <div className="loading" />
        ) : (
          <Outlet context={{ value }} />
        )}
      </section>
    </>
  );
};

export default HomeLayout;

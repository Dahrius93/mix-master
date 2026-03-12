//import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
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
  return (
    <>
      <Navbar /> {/* ← sempre presente */}
      <Outlet /> {/* ← cambia in base alla route */}
    </>
  );
};

export default HomeLayout;

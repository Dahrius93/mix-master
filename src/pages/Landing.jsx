import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  return "something";
};

const Landing = () => {
  const data = useLoaderData();
  console.log(data);
  return <h1>{data}</h1>;
};

export default Landing;

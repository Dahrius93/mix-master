const SinglePageError = () => {
  const error = useRouteError(); // hook di react router per prendere l'errore
  console.log(error);
  // return <h2>{error.message}</h2>; messaggio più preciso
  return <h2>there was an error...</h2>;
};

export default SinglePageError;

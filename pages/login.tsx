//This page is for login page.
//User can login and sign up.

import React, { useState, useEffect } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch data from the backend using a GET request
//     fetch(BACKEND_URL + "/test/")
//       .then((res) => res.json())
//       .then((data) => setData(data.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      <h1>Login page.</h1>
      {/* <p>{data ? data : "Loading data..."}</p>{" "} */}
      {/* Display data or loading message */}
    </div>
  );
};

export default Login
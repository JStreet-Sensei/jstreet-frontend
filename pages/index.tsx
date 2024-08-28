import React, { useState, useEffect } from "react";

const BACKEND_URL = process.env.BACKEND_URL;

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend using a GET request
    fetch(BACKEND_URL + "/test/")
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      <h1>Dockerised Full-Stack Template</h1>
      <h3>With Django, React, Postgres, and Docker</h3>
      <p>{data ? data : "Loading data..."}</p>{" "}
      {/* Display data or loading message */}
    </div>
  );
};

export default HomePage;

import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [query, setQuery] = useState("kohli");
  const [result, setResult] = useState("null");

  useEffect(async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=fc847093`,
    );
    const data = await response.json();
  }, []);
  return (
    <div>
      <h1>Find the movie you want</h1>
      <input
        placeholder="search you fav movie"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button>Search</button>
      <p></p>
    </div>
  );
}

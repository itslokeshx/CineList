import { useState, useEffect } from "react";

export default function MovieWatchlist() {
  const [query, setQuery] = useState("good will hunting");
  const [result, setResult] = useState([]);
  const [watchlater, setWatchLater] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=fc847093`,
      );
      const data = await response.json();
      setResult(data);
    };
    fetchData();
  }, [query]);
  return (
    <div>
      <form>
        <h1>Search the movie you want!</h1>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </form>
      {result.Search &&
        result.Search.map((res) => {
          return (
            <div key={res.imdbID}>
              {res.Poster !== "N/A" && <img src={res.Poster} />}
              <h4>{res.Title}</h4>
              <p>{res.Year}</p>
              <p>{res.Type}</p>
            </div>
          );
        })}
    </div>
  );
}

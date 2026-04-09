import Home from "./Home.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);
  return (
    <div>
      {watchlist.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} />
          <h4>{movie.Title}</h4>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}

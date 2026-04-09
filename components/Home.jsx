import { useState, useEffect } from "react";
import Watchlist from "./Watchlist.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("batman");
  const [result, setResult] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }
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

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const saveMovie = (movie) => {
    setWatchlist((prev) => {
      const updated = [...prev, movie];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Watchlist</h1>
        <Link to="/watchlist">
          <button>Go to Watchlist</button>
        </Link>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
          />
        </form>
      </header>

      <main className="results-grid">
        {result.Search &&
          result.Search.map((res) => {
            return (
              <div className="movie-card" key={res.imdbID}>
                {res.Poster !== "N/A" ? (
                  <img
                    className="movie-poster"
                    src={res.Poster}
                    alt={res.Title}
                  />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}
                <div className="movie-info">
                  <h4 className="movie-title">{res.Title}</h4>
                  <p className="movie-meta">
                    {res.Year} · {res.Type}
                  </p>
                  <button className="save-btn" onClick={() => saveMovie(res)}>
                    {watchlist.some((m) => m.imdbID === res.imdbID)
                      ? "Saved"
                      : "Watchlater"}
                  </button>
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
}

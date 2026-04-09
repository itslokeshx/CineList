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

  const deleteMovie = (id) => {
    const updated = watchlist.filter((m) => m.imdbID !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const clearAll = () => {
    setWatchlist([]);
    localStorage.removeItem("watchlist");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo-wrap">
          <span className="logo-icon">◈</span>
          <h1 className="logo">
            Cine<span>list</span>
          </h1>
        </div>
        <Link to="/" className="back-btn">
          ← Back to search
        </Link>
      </header>

      <section className="wl-hero">
        <div className="wl-hero-left">
          <p className="hero-eyebrow">Your collection</p>
          <h2 className="hero-heading">My Watchlist</h2>
        </div>
        {watchlist.length > 0 && (
          <div className="wl-hero-right">
            <span className="watchlist-count">
              {watchlist.length} {watchlist.length === 1 ? "film" : "films"}
            </span>
            <button className="clear-all-btn" onClick={clearAll}>
              Clear all
            </button>
          </div>
        )}
      </section>

      {watchlist.length === 0 ? (
        <div className="state-wrap">
          <span className="state-icon">⊟</span>
          <h3 className="state-heading">Your list is empty</h3>
          <p className="state-text">
            Search for movies and save them to watch later
          </p>
          <Link to="/" className="go-search-btn">
            Browse movies →
          </Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist
            .filter((movie) => movie.Poster !== "N/A")
            .map((movie, i) => (
              <div
                className="watchlist-card"
                key={movie.imdbID}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="poster-wrap">
                  <img
                    className="movie-poster"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <div className="poster-overlay">
                  <button
                    className="delete-btn"
                    onClick={() => deleteMovie(movie.imdbID)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <h4 className="movie-title">{movie.Title}</h4>
                <p className="movie-meta">
                  {movie.Year} ·{" "}
                  <span className="movie-type">{movie.Type}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

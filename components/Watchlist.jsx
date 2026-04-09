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

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <Link to="/" className="back-btn">
          ← Back
        </Link>
        <h1 className="watchlist-title">My Watchlist</h1>
        <span className="watchlist-count">{watchlist.length} movies</span>
      </header>

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <p>No movies saved yet!</p>
          <Link to="/">Search for movies</Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div className="watchlist-card" key={movie.imdbID}>
              {movie.Poster !== "N/A" ? (
                <img
                  className="watchlist-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              ) : (
                <div className="no-poster">No Poster</div>
              )}
              <div className="watchlist-info">
                <h4 className="watchlist-movie-title">{movie.Title}</h4>
                <p className="watchlist-year">
                  {movie.Year} · {movie.Type}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => deleteMovie(movie.imdbID)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedFor, setSearchedFor] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim() || query.length < 2) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true);
    setSearchedFor(query);

    debounceRef.current = setTimeout(async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=fc847093`,
      );
      const data = await response.json();
      setResult(data);
      setLoading(false);
    }, 400);
  };

  const clearSearch = () => {
    setQuery("");
    setResult({});
    setSearchedFor("");
  };

  const saveMovie = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) {
        return prev;
      }
      const updated = [...prev, movie];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (id) => watchlist.some((m) => m.imdbID === id);

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="logo">
          Cine<span>list</span>
        </h1>
        <Link to="/watchlist" className="watchlist-link">
          <button className="watchlist-btn">
            Watchlist
            {watchlist.length > 0 && <span className="count">({watchlist.length})</span>}
          </button>
        </Link>
      </header>

      <section className="search-section">
        <label className="search-label">Search for movies</label>
        <div className="search-wrapper">
          <form onSubmit={handleSearch} style={{ width: "100%", position: "relative" }}>
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a movie title..."
            />
            {query && (
              <button type="button" className="clear-btn" onClick={clearSearch}>
                ×
              </button>
            )}
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {loading && (
        <div className="loading">
          <div className="loading-spinner" />
          <p>Searching...</p>
        </div>
      )}

      {!loading && result.Response === "False" && (
        <div className="no-results">
          <h3>No movies found for "{searchedFor}"</h3>
          <p>Try a different search term</p>
        </div>
      )}

      {!loading && result.Search && (
        <>
          <p className="results-label">
            Results <span className="results-count">({result.totalResults})</span>
          </p>
          <main className="results-grid">
            {result.Search.map((res) => (
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
                  <p className="movie-meta">{res.Year}</p>
                  <button
                    className={`save-btn ${isSaved(res.imdbID) ? "saved" : ""}`}
                    onClick={() => saveMovie(res)}
                  >
                    {isSaved(res.imdbID) ? "Saved" : "Watchlater"}
                  </button>
                </div>
              </div>
            ))}
          </main>
        </>
      )}
    </div>
  );
}

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
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      const updated = [...prev, movie];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (id) => watchlist.some((m) => m.imdbID === id);

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo-wrap">
          <span className="logo-icon">◈</span>
          <h1 className="logo">
            Cine<span>list</span>
          </h1>
        </div>
        <Link to="/watchlist" className="watchlist-link">
          <button className="watchlist-btn">
            <span className="btn-icon">⊟</span>
            My List
            {watchlist.length > 0 && (
              <span className="count">{watchlist.length}</span>
            )}
          </button>
        </Link>
      </header>

      <section className="hero-section">
        <p className="hero-eyebrow">Your personal cinema</p>
        <h2 className="hero-heading">
          Find & save movies
          <br />
          you want to watch
        </h2>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-wrapper">
            <span className="search-icon">⊕</span>
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any movie title..."
            />
            {query && (
              <button type="button" className="clear-btn" onClick={clearSearch}>
                ×
              </button>
            )}
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </section>

      {loading && (
        <div className="state-wrap">
          <div className="loading-spinner" />
          <p className="state-text">Searching for "{searchedFor}"...</p>
        </div>
      )}

      {!loading && result.Response === "False" && (
        <div className="state-wrap">
          <span className="state-icon">⊘</span>
          <h3 className="state-heading">No results for "{searchedFor}"</h3>
          <p className="state-text">
            Try a different title or check your spelling
          </p>
        </div>
      )}

      {!loading && result.Search && (
        <section className="results-section">
          <div className="results-meta">
            <span className="results-label">Results</span>
            <span className="results-divider">—</span>
            <span className="results-count">
              {result.totalResults} titles found
            </span>
          </div>
          <div className="results-grid">
            {result.Search.map((res, i) => (
              <div
                className="movie-card"
                key={res.imdbID}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="poster-wrap">
                  {res.Poster !== "N/A" ? (
                    <img
                      className="movie-poster"
                      src={res.Poster}
                      alt={res.Title}
                    />
                  ) : (
                    <div className="no-poster">
                      <span>◈</span>
                      <p>No Poster</p>
                    </div>
                  )}
                  <div className="poster-overlay">
                    <button
                      className={`save-btn ${isSaved(res.imdbID) ? "saved" : ""}`}
                      onClick={() => saveMovie(res)}
                    >
                      {isSaved(res.imdbID) ? "✓ Saved" : "+ Save"}
                    </button>
                  </div>
                </div>
                <div className="movie-info">
                  <h4 className="movie-title">{res.Title}</h4>
                  <p className="movie-meta">
                    {res.Year} · <span className="movie-type">{res.Type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && !result.Search && !result.Response && (
        <div className="empty-home">
          <div className="empty-grid">
            {[
              "The Dark Knight",
              "Whiplash",
              "The Shawshank Redemption",
              "Pirates of the Caribbean",
              "Interstellar",
              "Good Will Hunting",
            ].map((t) => (
              <div
                key={t}
                className="suggestion-pill"
                onClick={() => {
                  setQuery(t);
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <p className="empty-hint">or search for something above</p>
        </div>
      )}
    </div>
  );
}

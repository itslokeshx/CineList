import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchedFor, setSearchedFor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const fetchMovies = async (searchQuery, page = 1, append = false) => {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&page=${page}&apikey=fc847093`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      const newMovies = (data.Search || []).filter(
        (movie) => movie.Poster && movie.Poster !== "N/A",
      );
      const total = parseInt(data.totalResults) || 0;

      if (append) {
        setMovies((prev) => [...prev, ...newMovies]);
        setHasMore(page < 10 && page * 10 < total);
      } else {
        setMovies(newMovies);
        setTotalResults(total);
        setHasMore(total > 10);
      }
    } else {
      if (!append) {
        setMovies([]);
        setTotalResults(0);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    }
    return data;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim() || query.length < 2) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true);
    setSearchedFor(query);
    setCurrentPage(1);
    setMovies([]);

    debounceRef.current = setTimeout(async () => {
      await fetchMovies(query, 1, false);
      setLoading(false);
    }, 400);
  };

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;
    await fetchMovies(searchedFor, nextPage, true);
    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    setTotalResults(0);
    setSearchedFor("");
    setCurrentPage(1);
    setHasMore(true);
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

  const handleImageError = (imdbID) => {
    setMovies((prev) => prev.filter((m) => m.imdbID !== imdbID));
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

      {!loading && movies.length === 0 && searchedFor && (
        <div className="state-wrap">
          <span className="state-icon">⊘</span>
          <h3 className="state-heading">No results for "{searchedFor}"</h3>
          <p className="state-text">
            Try a different title or check your spelling
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <section className="results-section">
          <div className="results-meta">
            <span className="results-label">Results</span>
            <span className="results-divider">—</span>
            <span className="results-count">{totalResults} titles found</span>
          </div>
          <div className="results-grid">
            {movies.map((movie, i) => (
              <div
                className="movie-card"
                key={movie.imdbID}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="poster-wrap">
                  <img
                    className="movie-poster"
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={() => handleImageError(movie.imdbID)}
                    loading="lazy"
                  />
                  <div className="poster-overlay">
                    <button
                      className={`save-btn ${isSaved(movie.imdbID) ? "saved" : ""}`}
                      onClick={() => saveMovie(movie)}
                    >
                      {isSaved(movie.imdbID) ? "✓ Saved" : "+ Save"}
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
          {hasMore && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <div className="loading-spinner" />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {!loading && movies.length === 0 && !searchedFor && (
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

import { useState, useEffect } from "react";

export default function MovieWatchlist() {
  const [query, setQuery] = useState("Batman");
  const [result, setResult] = useState([]);
  const [watchlater, setWatchLater] = useState([]);

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

  const saveMovie = (movie) => {
    setWatchLater((prev) => [...prev, movie]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Watchlist</h1>
        <form className="search-form">
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
                    + Watchlist
                  </button>
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
}

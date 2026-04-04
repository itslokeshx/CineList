import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [query, setQuery] = useState("null");
  const [result, setResult] = useState("null");
  return (
    <div>
      <h1>Find the movie you want</h1>
      <input placeholder="search you fav movie" />
      <button>Search</button>
    </div>
  );
}

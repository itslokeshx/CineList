import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "/components/Home.jsx";
import Watchlist from "/components/Watchlist.jsx";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

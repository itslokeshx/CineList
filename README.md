# 🎬 CineList

A sleek, modern movie discovery and watchlist management application. Search millions of movies, save your favorites, and keep track of films you want to watch.

🔗 **[Live Demo](https://save-your-movie.vercel.app/)**

---

## ✨ Features

- **🔍 Powerful Search** - Instant movie search with real-time results powered by OMDB API
- **⭐ Save to Watchlist** - One-click save functionality for movies you want to watch
- **💾 Persistent Storage** - Your watchlist is saved locally and persists across sessions

---

## 📦 Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| **React 19**     | UI framework                 |
| **React Router** | Client-side routing          |
| **Vite**         | Build tool & dev server      |
| **OMDB API**     | Movie data source            |
| **localStorage** | Persistent watchlist storage |

---

## 🎯 How to Use

1. **Search** - Enter a movie title in the search bar
2. **Browse** - Scroll through search results
3. **Save** - Click the save button to add movies to your watchlist
4. **Manage** - Visit your watchlist to view all saved movies
5. **Remove** - Delete movies from your watchlist anytime

---

## 📁 Project Structure

```
movie-watchlist/
├── components/
│   ├── Home.jsx          # Main search page
│   └── Watchlist.jsx     # Watchlist display
├── src/
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── styles.css        # Global styles
├── package.json
├── vite.config.js
└── README.md
```

---

## 🌐 API Integration

This app uses the **OMDB API** for movie data. To use this app:

1. Get a free API key from [omdbapi.com](http://www.omdbapi.com/)
2. Add it to your environment variables (see `.env.example`)

---

## 📝 License

MIT License © 2026

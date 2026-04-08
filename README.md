# Movie Watchlist

A clean, minimalist React application for searching movies and building your personal watchlist. Powered by the [OMDb API](https://www.omdbapi.com/).

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Real-time Search** — Search movies instantly as you type
- **Movie Details** — View posters, release years, and media types
- **Watchlist** — Save movies to your personal watchlist with one click
- **Responsive Design** — Clean grid layout that adapts to all screen sizes
- **Dark Theme** — Easy on the eyes with a refined dark aesthetic

## Tech Stack

- **Framework:** React 19 with Hooks
- **Build Tool:** Vite
- **Styling:** Pure CSS with custom properties
- **API:** OMDb API
- **Fonts:** DM Sans & DM Serif Display

## Project Structure

```
movie-watchlist/
├── src/
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
│   └── styles.css     # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## API Configuration

This project uses the OMDb API with a demo API key. For production use, obtain your own API key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx) and replace it in `App.jsx`:

```javascript
const API_KEY = "your-api-key";
```

## License

MIT License — feel free to use this project for personal or commercial purposes.

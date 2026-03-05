# MasMax

A modern, performance-focused movie and TV series discovery app built with React 18, TypeScript, and Vite. Browse trending movies and shows, explore by genre, search, and view full detail pages — all powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

---

## Features

- 🎬 **Movies** — trending, popular, top-rated, with full detail pages
- 📺 **TV Series** — popular, top-rated, trending, on-air, with full detail pages
- 🔍 **Search** — live autocomplete + full search results page
- 🎭 **Genres** — browse any genre via genre rail or detail-page genre pills
- 🖼️ **Responsive images** — TMDB `srcset` + blur-up placeholders on every card
- ⚡ **Performance** — route-level code splitting, early hero fetch, deferred fonts
- 🎨 **Themes** — Dark, Midnight, Ocean — CSS custom-property–based, persistent
- 🔐 **Auth** — email/password via Supabase + Google OAuth via Firebase

---

## Tech Stack

| Layer         | Library                                             |
| ------------- | --------------------------------------------------- |
| UI            | React 18, TypeScript                                |
| Build         | Vite 5, `@vitejs/plugin-react`                      |
| Routing       | React Router DOM v6                                 |
| Data fetching | `@tanstack/react-query` v5 + custom cache           |
| Styling       | Tailwind CSS v3 + CSS custom properties             |
| Auth          | Firebase (Google OAuth) + Supabase (email/password) |
| Icons         | Custom SVG icon components + Lucide React           |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A [TMDB API](https://developer.themoviedb.org/docs) read-access token
- A [Firebase](https://console.firebase.google.com/) project (Google Auth)
- A [Supabase](https://supabase.com/) project (email/password auth)

### Installation

```bash
git clone https://github.com/Matt-2004/MasMax.git
cd MasMax
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# TMDB
VITE_TMDB_TOKEN=your_tmdb_read_access_token

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
MasMax/
├── public/
├── src/
│   ├── App.tsx                  # Root — providers, router, lazy routes
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles, Tailwind directives
│   │
│   ├── lib/                     # Shared utilities, configs, types
│   │   ├── FetchAPI.ts          # All TMDB fetch functions + in-memory cache
│   │   ├── GetImagePath.ts      # TMDB image URL helpers + srcset builders
│   │   ├── GetVideoPath.ts      # YouTube embed URL helper
│   │   ├── Interfaces.ts        # TypeScript types (MovieResult, TVResult, etc.)
│   │   ├── ThemeContext.tsx     # Theme definitions + useTheme hook
│   │   ├── UserContext.tsx      # Firebase auth state + useUser hook
│   │   ├── FirebaseConfig.ts    # Firebase app init
│   │   ├── SupabaseConfig.ts    # Supabase client init
│   │   └── icons/
│   │       └── icons.tsx        # Inline SVG icon components
│   │
│   └── components/
│       ├── Skeletons.tsx        # Shared skeleton components
│       │
│       ├── layout/              # App shell — present on every page
│       │   ├── NavBar.tsx       # Responsive nav, search autocomplete, theme toggle
│       │   ├── Footer.tsx       # Site footer
│       │   ├── Home.tsx         # Home page — hero + sections
│       │   ├── HeroSection.tsx  # Full-bleed carousel hero
│       │   ├── GenreRail.tsx    # Scrollable genre pill strip
│       │   ├── AutoComplete.tsx # Search autocomplete dropdown
│       │   └── ThemeToggle.tsx  # Theme switcher UI
│       │
│       ├── cards/               # Reusable card components
│       │   ├── MovieCard.tsx    # Popular / top-rated movie grid
│       │   ├── Trending.tsx     # Trending movies section
│       │   ├── ImageUI.tsx      # Card image with blur-up + srcset
│       │   ├── FilterUI.tsx     # Tab filter buttons
│       │   └── MovieCards.tsx   # General card grid wrapper
│       │
│       ├── details/             # Movie & series detail pages
│       │   ├── MovieDetails.tsx # Movie detail page (route: /movie/:id)
│       │   └── DetailsComponents.tsx  # Shared detail UI: backdrop, poster,
│       │                              # genres, rating, watchlist, videos
│       │
│       ├── series/              # TV series pages
│       │   ├── SeriesPage.tsx   # Series browse (route: /series)
│       │   └── SeriesDetils.tsx # Series detail page (route: /series/:id)
│       │
│       ├── genres/              # Genre browsing
│       │   ├── GenrePage.tsx    # Genre results (route: /genres/:genreId)
│       │   ├── DropDownGenres.tsx  # NavBar genre dropdown
│       │   └── GenreSkeletons.tsx  # Genre page loading skeletons
│       │
│       ├── search/
│       │   └── SearchPage.tsx   # Search results (route: /search/:term)
│       │
│       ├── auth/                # Authentication
│       │   ├── Register.tsx     # Registration page (route: /register)
│       │   ├── Login.tsx        # Login page (route: /login)
│       │   ├── FireBaseAuth.tsx # Google OAuth button
│       │   ├── FormUI.tsx       # Auth form wrapper
│       │   ├── InputUI.tsx      # Styled input with validation icon
│       │   ├── Button.tsx       # Auth submit button
│       │   └── helper.ts        # Validation regexes
│       │
│       ├── profile/
│       │   └── Profile.tsx      # User profile page
│       │
│       └── carousel/
│           └── Carousels.tsx    # Generic carousel component
│
├── index.html                   # Entry HTML — critical CSS, early fetch script
├── vite.config.ts               # Vite config — manual chunks, terser minification
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config — @/ path alias
└── package.json
```

---

## Routes

| Path                | Component      | Description                                                 |
| ------------------- | -------------- | ----------------------------------------------------------- |
| `/`                 | `Home`         | Landing page with hero carousel, genre rail, movie sections |
| `/movie/:movieId`   | `MovieDetails` | Full movie detail page                                      |
| `/series`           | `SeriesPage`   | Browse TV series (popular, top-rated, trending, on-air)     |
| `/series/:seriesId` | `SeriesDetils` | Full series detail page with seasons + cast                 |
| `/genres/:genreId`  | `GenrePage`    | Movies filtered by genre                                    |
| `/search/:searchId` | `SearchPage`   | Full-text movie search results                              |
| `/register`         | `Register`     | Email/password registration                                 |
| `/login`            | `Login`        | Email/password + Google OAuth login                         |

---

## Performance

| Technique                  | Where                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Route-level code splitting | All routes are `React.lazy()` — zero blocking JS on initial load                                |
| Early hero fetch           | `index.html` inline `<script>` fires TMDB trending request before React parses                  |
| In-memory request cache    | `_cache` Map in `FetchAPI.ts` deduplicates identical fetches within a session                   |
| Responsive images          | `srcset` + `sizes` on every poster and backdrop via `getPosterSrcSet()` / `getBackdropSrcSet()` |
| Blur-up placeholders       | Tiny 92px poster loaded as CSS `background-image` while full image loads                        |
| Non-blocking fonts         | Google Fonts loaded via `media="print" onload` to eliminate render-blocking                     |
| Manual Vite chunks         | `react-vendor`, `router-vendor`, `query-vendor`, `firebase-vendor` split for long-term caching  |
| Lazy shell components      | `NavBar`, `Footer`, `GenreRail` lazy-loaded on every page                                       |

---

## Theming

Three built-in themes selectable from the NavBar:

| Theme       | ID         |
| ----------- | ---------- |
| 🌑 Dark     | `dark`     |
| 🌃 Midnight | `midnight` |
| 🌊 Ocean    | `ocean`    |

All colors are CSS custom properties (`--accent`, `--bg-base`, `--bg-card`, etc.) applied to `<html data-theme="...">`. Theme preference is persisted in `localStorage`.

---

## API

All data comes from the [TMDB API v3](https://developer.themoviedb.org/reference/intro/getting-started). Key endpoints used:

- `GET /trending/movie/day` — hero carousel
- `GET /movie/popular`, `/movie/top_rated`, `/movie/upcoming`, `/movie/now_playing`
- `GET /movie/{id}` — movie details
- `GET /movie/{id}/videos` — trailers
- `GET /discover/movie?with_genres={id}` — genre browse
- `GET /search/movie` — search
- `GET /tv/popular`, `/tv/top_rated`, `/tv/trending`, `/tv/on_the_air`
- `GET /tv/{id}?append_to_response=aggregate_credits` — series details + cast
- `GET /tv/{id}/videos` — series trailers
- `GET /genre/movie/list`, `/genre/tv/list` — genre lists

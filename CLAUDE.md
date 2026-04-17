# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at localhost:3000
npm run build    # Production build
npm test         # Jest test runner (interactive watch mode)
```

No custom lint script — ESLint runs via Create React App defaults (eslint-config-react-app).

## Architecture

**Stack:** React 19, React Router 7, TanStack React Query 5, Tailwind CSS 3, Axios, shadcn-style UI components (Radix UI + CVA).

**APIs (no auth required):**
- Open-Meteo (`api.open-meteo.com/v1/forecast`) — weather and geocoding
- BigDataCloud — reverse geocoding from coordinates

### Data flow

1. `App.js` sets up `QueryClient` (5-min stale time), Router, and `ThemeProvider`.
2. `Home.jsx` reads `?lat=&lon=&city=&country=` query params on load; if absent, calls `navigator.geolocation` then reverse-geocodes via BigDataCloud.
3. `useWeather.js` hooks call `src/api/weather.js` through React Query. Query keys: `["weather", coords]`, `["forecast", coords]`, `["location-search", query]`.
4. WMO weather codes are mapped to icons in `src/api/iconMap.js`.
5. Favorites and search history persist to `localStorage` via `useFavorites.js` and `useSearchHistory.js`; React Query is used to keep UI in sync.

### Directory layout

| Path | Purpose |
|------|---------|
| `src/api/` | All external API calls (`weather.js`, `location.js`, `iconMap.js`) |
| `src/hooks/` | Custom hooks — data fetching (`useWeather.js`) and local storage (`useFavorites.js`, `useSearchHistory.js`) |
| `src/pages/` | Page-level components (`Home.jsx`, `CityPage.jsx`) |
| `src/components/` | Feature components; `src/components/ui/` holds shadcn-style primitives |
| `src/context/` | `ThemeProvider` (light/dark/system, stored in localStorage as `"vite-ui-theme"`) |
| `src/helpers/` | Date formatters (`formatters.js`) and icon URL resolver (`get-icons.js`) |

### Theme

Dark mode is class-based (`dark:` Tailwind prefix). `ThemeToggle.jsx` updates the class on `<html>` via `next-themes`.

### Routing

City navigation passes location as query params (`/city?lat=X&lon=Y&city=X&country=Y`) rather than route segments, so `Home.jsx` reads `useSearchParams()` to determine which location to fetch.

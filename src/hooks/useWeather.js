import { useQuery } from "@tanstack/react-query";
import { WeatherAPI } from "../api/weather";

export const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["location-search", query],
};

export function useWeatherQuery(coords) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coords),
    queryFn: () => WeatherAPI.getWeather(coords),
    enabled: coords !== null,
  });
}

export function useForecastQuery(coords) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coords),
    queryFn: () => WeatherAPI.getForecast(coords),
    enabled: coords !== null,
  });
}

export function useReverseGeocode(coords) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coords),
    queryFn: () => WeatherAPI.getReverseGeocode(coords),
    enabled: coords !== null,
  });
}
export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => WeatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}

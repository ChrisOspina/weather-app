import { useQuery } from "@tanstack/react-query";
import { WeatherAPI } from "../api/weather";

export const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["location-search", query],
};

export function useWeatherQuery() {}

export function useForecastQuery() {}

export function usereverseGeocode() {}

export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => WeatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}

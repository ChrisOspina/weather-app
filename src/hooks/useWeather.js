import { useQuery } from "@tanstack/react-query";

//TODO create WEATHER_KEYS and weatherAPI

export function useWeatherQuery() {}

export function useForecastQuery() {}

export function usereverseGeocode() {}

export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}

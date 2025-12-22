import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../hooks/useWeather";

const CityPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  console.log(params);
  console.log(coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }
  return <div>CityPage</div>;
};

export default CityPage;

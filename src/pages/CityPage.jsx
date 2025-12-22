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
  return (
    <div>
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-300 ${
          isLoading ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center">
            {params.cityName}
          </h1>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading weather data...</p>
              </div>
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather
                current={weatherQuery.data.current}
                location={params.cityName}
              />
              <DailyForcecast daily={weatherQuery.data.daily} />
              <HourlyForecast hourly={weatherQuery.data.hourly} />
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 text-lg">
                Unable to load weather data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityPage;

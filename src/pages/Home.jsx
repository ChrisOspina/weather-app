import { useEffect, useState } from "react";
import { getLocation } from "../api/location";
import DailyForcecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import CurrentWeather from "../components/CurrentWeather";
import { WeatherAPI } from "../api/weather";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const weatherApi = new WeatherAPI();

  useEffect(() => {
    const positionSuccess = async ({ coords }) => {
      try {
        const locationName = await getLocation(
          coords.latitude,
          coords.longitude
        );
        setLocation(locationName);

        const data = await weatherApi.getWeather(
          coords.latitude,
          coords.longitude,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );

        setWeatherData(data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        alert("Error getting weather.");
        setIsLoading(false);
      }
    };

    const positionError = () => {
      alert(
        "There was an error getting your location. Please allow us to use your location and refresh the page"
      );
      setIsLoading(false);
    };
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-300 ${
        isLoading ? "blur-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center">
          Anipso Weather Dashboard
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
            <CurrentWeather current={weatherData.current} location={location} />
            <DailyForcecast daily={weatherData.daily} />
            <HourlyForecast hourly={weatherData.hourly} />
          </>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 text-lg">Unable to load weather data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

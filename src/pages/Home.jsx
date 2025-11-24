import { useEffect, useState } from "react";
import { getWeather } from "../api/weather";
import { DAY_FORMATTER, HOUR_FORMATTER } from "../helpers/formatters";
import { getIconUrl } from "../helpers/get-icons";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const positionSuccess = ({ coords }) => {
      getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
        .then((data) => {
          setWeatherData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          alert("Error getting weather.");
          setIsLoading(false);
        });
    };

    const positionError = () => {
      alert(
        "There was an error getting your location. Please allow us to use your location and refresh the page"
      );
      setIsLoading(false);
    };
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  }, []);

  //render current weather section
  const renderCurrentWeather = (current) => {
    if (!current) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-2">
              {current.currentTemp}°
            </h2>
            <div className="flex gap-4 text-gray-600">
              <span>H: {current.highTemp}°</span>
              <span>L: {current.lowTemp}°</span>
            </div>
          </div>
          <img
            src={getIconUrl(current.iconCode)}
            alt="Weather icon"
            className="w-24 h-24"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1">Feels Like High</p>
            <p className="text-lg font-semibold text-gray-800">
              {current.highFeelsLike}°
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Feels Like Low</p>
            <p className="text-lg font-semibold text-gray-800">
              {current.lowFeelsLike}°
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-800">
              {current.windSpeed} mph
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Precipitation</p>
            <p className="text-lg font-semibold text-gray-800">
              {current.precip}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render daily weather section
  const renderDailyWeather = (daily) => {
    if (!daily) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          7-Day Forecast
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {daily.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-600 mb-2">
                {DAY_FORMATTER.format(day.timestamp)}
              </span>
              <img
                src={getIconUrl(day.iconCode)}
                alt="Weather icon"
                className="w-12 h-12 mb-2"
              />
              <div data-temp>{day.maxTemp}°</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render hourly weather section
  const renderHourlyWeather = (hourly) => {
    if (!hourly) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          Hourly Forecast
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                  Day
                </th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                  Time
                </th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-600">
                  Weather
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Temp
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Feels Like
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Wind
                </th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Precip
                </th>
              </tr>
            </thead>
            <tbody>
              {hourly.map((hour, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-2 text-sm text-gray-600">
                    {DAY_FORMATTER.format(hour.timestamp)}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-800 font-medium">
                    {HOUR_FORMATTER.format(hour.timestamp)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <img
                      src={getIconUrl(hour.iconCode)}
                      alt="Weather icon"
                      className="w-8 h-8 mx-auto"
                    />
                  </td>

                  <td className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.temp}°</span>
                  </td>
                  <td className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.feelsLike}°</span>
                  </td>
                  <td className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.windSpeed}</span>
                  </td>
                  <td className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.precip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  //Main render
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-300 ${
        isLoading ? "blur-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center">
          Weather Dashboard
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
            {renderCurrentWeather(weatherData.current)}
            {renderDailyWeather(weatherData.daily)}
            {renderHourlyWeather(weatherData.hourly)}
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

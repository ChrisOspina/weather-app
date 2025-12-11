import axios from "axios";

export class WeatherAPI {
  constructor() {
    this.baseURL = "https://api.open-meteo.com/v1/forecast";
    this.defaultParams = {
      hourly:
        "temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m",
      daily:
        "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum",
      current_weather: true,
      temperature_unit: "fahrenheit",
      windspeed_unit: "mph",
      precipitation_unit: "inch",
      timeformat: "unixtime",
    };
  }

  async getWeather(lat, lon, timezone) {
    try {
      const { data } = await axios.get(this.baseURL, {
        params: {
          ...this.defaultParams,
          latitude: lat,
          longitude: lon,
          timezone,
        },
      });

      return {
        current: this.parseCurrentWeather(data),
        daily: this.parseDailyWeather(data),
        hourly: this.parseHourlyWeather(data),
      };
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  parseCurrentWeather({ current_weather, daily }) {
    const {
      temperature: currentTemp,
      windspeed: windSpeed,
      weathercode: iconCode,
    } = current_weather;

    const {
      temperature_2m_max: [maxTemp],
      temperature_2m_min: [minTemp],
      apparent_temperature_max: [maxFeelsLike],
      apparent_temperature_min: [minFeelsLike],
      precipitation_sum: [precip],
    } = daily;

    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(maxTemp),
      lowTemp: Math.round(minTemp),
      highFeelsLike: Math.round(maxFeelsLike),
      lowFeelsLike: Math.round(minFeelsLike),
      windSpeed: Math.round(windSpeed),
      precip: Math.round(precip * 100) / 100,
      iconCode,
    };
  }

  parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => ({
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    }));
  }

  parseHourlyWeather({ hourly, current_weather }) {
    if (!hourly || !hourly.time || !current_weather) return [];

    return hourly.time
      .map((time, index) => ({
        timestamp: Number(time) * 1000,
        iconCode: hourly.weathercode?.[index],
        temp: Math.round(hourly.temperature_2m?.[index]),
        feelsLike: Math.round(hourly.apparent_temperature?.[index]),
        windSpeed: Math.round(hourly.windspeed_10m?.[index]),
        precip: Math.round((hourly.precipitation?.[index] ?? 0) * 100) / 100,
      }))
      .filter(
        (entry) => entry.timestamp >= Number(current_weather.time) * 1000
      );
  }
}

// Usage example:
// const weatherAPI = new WeatherAPI();
// const weather = await weatherAPI.getWeather(40.7128, -74.0060, "America/New_York");

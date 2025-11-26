import React from "react";
import { MapPin } from "lucide-react";
import { getIconUrl } from "../helpers/get-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const CurrentWeather = ({ current, location }) => {
  if (!current || !location) {
    return null;
  }
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      {location && (
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div>
              <MapPin className="text-blue-500 h-4 w-4" />
            </div>
            {location}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex items-center justify-between mb-6">
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
      </CardContent>
      <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
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
      </CardFooter>
    </Card>
  );
};

export default CurrentWeather;

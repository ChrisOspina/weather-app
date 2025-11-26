import React from "react";
import { DAY_FORMATTER } from "../helpers/formatters";
import { getIconUrl } from "../helpers/get-icons";
import { Card, CardContent, CardTitle } from "../components/ui/card";

const DailyForcecast = ({ daily }) => {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <CardTitle className="text-2xl font-bold text-gray-600 mb-4 text-center">
        7-Day Forecast
      </CardTitle>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
      </CardContent>
    </Card>
  );
};

export default DailyForcecast;

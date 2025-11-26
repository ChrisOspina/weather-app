import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { DAY_FORMATTER, HOUR_FORMATTER } from "../helpers/formatters";
import { getIconUrl } from "../helpers/get-icons";

const HourlyForecast = ({ hourly }) => {
  if (!hourly) {
    return null;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          Hourly Forecast
        </h3>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                  Day
                </TableHead>
                <TableHead className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                  Time
                </TableHead>
                <TableHead className="text-center py-3 px-2 text-sm font-semibold text-gray-600">
                  Weather
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Temp
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Feels Like
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Wind
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-gray-600">
                  Precip
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hourly.map((hour, index) => (
                <TableRow
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="py-3 px-2 text-sm text-gray-600">
                    {DAY_FORMATTER.format(hour.timestamp)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-sm text-gray-800 font-medium">
                    {HOUR_FORMATTER.format(hour.timestamp)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center">
                    <img
                      src={getIconUrl(hour.iconCode)}
                      alt="Weather icon"
                      className="w-8 h-8 mx-auto"
                    />
                  </TableCell>

                  <TableCell className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.temp}°</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.feelsLike}°</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.windSpeed}</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-gray-600">
                    <span>{hour.precip}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;

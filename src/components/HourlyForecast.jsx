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
  const MAX_ROWS = 24;
  hourly = hourly?.slice(0, MAX_ROWS);

  return (
    <div>
      <div className="bg-card rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-card-foreground mb-4 text-center">
          Hourly Forecast
        </h3>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-left py-3 px-2 text-sm font-semibold text-foreground">
                  Day
                </TableHead>
                <TableHead className="text-left py-3 px-2 text-sm font-semibold text-foreground">
                  Time
                </TableHead>
                <TableHead className="text-center py-3 px-2 text-sm font-semibold text-foreground">
                  Weather
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-foreground">
                  Temp
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-foreground">
                  Feels Like
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-foreground">
                  Wind
                </TableHead>
                <TableHead className="text-right py-3 px-2 text-sm font-semibold text-foreground">
                  Precip
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hourly.map((hour, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border hover:bg-accent transition-colors"
                >
                  <TableCell className="py-3 px-2 text-sm text-foreground">
                    {DAY_FORMATTER.format(hour.timestamp)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-sm text-card-foreground font-medium">
                    {HOUR_FORMATTER.format(hour.timestamp)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center">
                    <img
                      src={getIconUrl(hour.iconCode)}
                      alt="Weather icon"
                      className="w-8 h-8 mx-auto"
                    />
                  </TableCell>

                  <TableCell className="py-3 px-2 text-right text-sm text-foreground">
                    <span>{hour.temp}°</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-foreground">
                    <span>{hour.feelsLike}°</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-foreground">
                    <span>{hour.windSpeed}</span>
                  </TableCell>
                  <TableCell className="py-3 px-2 text-right text-sm text-foreground">
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

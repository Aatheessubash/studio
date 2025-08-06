
"use client"

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WeatherData } from "@/lib/weather";
import { Sun, Cloud, CloudRain, CloudLightning, CloudDrizzle, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const weatherIcons = {
  Sunny: <Sun className="h-6 w-6 text-yellow-500" />,
  Cloudy: <Cloud className="h-6 w-6 text-gray-500" />,
  Rainy: <CloudRain className="h-6 w-6 text-blue-500" />,
  Stormy: <CloudLightning className="h-6 w-6 text-purple-500" />,
  'Partly Cloudy': <CloudDrizzle className="h-6 w-6 text-gray-400" />,
};

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <Card className="animate-in fade-in duration-500 delay-100">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Enter a location to see the weather.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center h-full min-h-[200px]">
            <p className="text-sm font-medium text-muted-foreground">
              Weather information will be shown here.
            </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in duration-500 delay-200">
      <CardHeader>
        <CardTitle>{weatherData.location}</CardTitle>
        <CardDescription>Current weather and 3-day forecast.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            {weatherIcons[weatherData.condition]}
            <div>
              <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
              <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                <span>Humidity: {weatherData.humidity}%</span>
             </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Forecast</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1 rounded-md bg-secondary p-2">
                <p className="text-xs font-semibold">{day.day}</p>
                {weatherIcons[day.condition]}
                <p className="text-sm font-bold">{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;

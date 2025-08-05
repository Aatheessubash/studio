"use client"

import type { FC } from 'react';
import type { WeatherData } from '@/lib/weather';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSun, Zap, Droplets } from 'lucide-react';
import { Separator } from '../ui/separator';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherIcon: FC<{ condition: WeatherData['condition'], className?: string }> = ({ condition, className }) => {
  switch (condition) {
    case 'Sunny': return <Sun className={className} />;
    case 'Cloudy': return <Cloud className={className} />;
    case 'Rainy': return <CloudRain className={className} />;
    case 'Partly Cloudy': return <CloudSun className={className} />;
    case 'Stormy': return <Zap className={className} />;
    default: return <Sun className={className} />;
  }
};

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <Card className="h-full bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800/50 animate-in fade-in duration-500 delay-100">
         <CardHeader>
           <CardTitle className="text-sky-900 dark:text-sky-100">Weather Forecast</CardTitle>
         </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sky-200 dark:border-sky-800/50 bg-sky-100/50 dark:bg-sky-900/20 p-8 text-center h-full min-h-[200px]">
              <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                Enter a location to see the weather forecast.
              </p>
            </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/50 dark:to-blue-900/50 border-sky-200 dark:border-sky-800/50 animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-sky-900 dark:text-sky-100">Weather in {weatherData.location}</CardTitle>
        <CardDescription className="text-sky-800 dark:text-sky-300">Current conditions and 3-day forecast.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-white/50 dark:bg-black/20 p-4 shadow-inner">
          <div className="flex flex-col">
            <span className="text-5xl font-bold text-sky-900 dark:text-sky-100">{weatherData.temperature}°C</span>
            <span className="font-medium text-sky-700 dark:text-sky-300">{weatherData.condition}</span>
          </div>
          <WeatherIcon condition={weatherData.condition} className="h-16 w-16 text-sky-500" />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-sky-800 dark:text-sky-200">
            <Droplets className="h-4 w-4" />
            <span>Humidity: {weatherData.humidity}%</span>
        </div>

        <Separator className="bg-sky-200 dark:bg-sky-800/50"/>

        <div>
            <h4 className="mb-2 text-sm font-medium text-sky-800 dark:text-sky-200">Forecast</h4>
            <div className="space-y-2">
            {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between text-sm rounded-md p-2 bg-white/30 dark:bg-black/10">
                <span className="font-medium text-sky-700 dark:text-sky-300">{day.day}</span>
                <div className="flex items-center gap-2">
                    <WeatherIcon condition={day.condition} className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    <span className="w-12 text-right font-semibold text-sky-900 dark:text-sky-100">{day.temp}°C</span>
                </div>
                </div>
            ))}
            </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;

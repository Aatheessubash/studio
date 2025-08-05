export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy' | 'Stormy';
  forecast: {
    day: string;
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy' | 'Stormy';
  }[];
}

const conditions: WeatherData['condition'][] = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy'];

// A simple hashing function to get a somewhat consistent random number for a given string
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const fetchWeatherData = (location: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hash = simpleHash(location.toLowerCase());

      const today = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const data: WeatherData = {
        location: location.charAt(0).toUpperCase() + location.slice(1),
        temperature: (hash % 25) + 15, // Temp between 15°C and 40°C
        humidity: (hash % 50) + 40, // Humidity between 40% and 90%
        condition: conditions[hash % conditions.length],
        forecast: [
          {
            day: 'Tomorrow',
            temp: ((hash * 2) % 25) + 14,
            condition: conditions[(hash * 2) % conditions.length],
          },
          {
            day: days[(today.getDay() + 2) % 7],
            temp: ((hash * 3) % 25) + 16,
            condition: conditions[(hash * 3) % conditions.length],
          },
          {
            day: days[(today.getDay() + 3) % 7],
            temp: ((hash * 4) % 25) + 15,
            condition: conditions[(hash * 4) % conditions.length],
          },
        ],
      };
      resolve(data);
    }, 1200); // Simulate network delay
  });
};

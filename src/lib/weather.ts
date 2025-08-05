
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

const generateWeatherData = (location: string): WeatherData => {
    const hash = simpleHash(location.toLowerCase());

    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return {
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
}


export const fetchWeatherData = (location: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateWeatherData(location);
      resolve(data);
    }, 1200); // Simulate network delay
  });
};


// This is a mock function. In a real app, you'd use a reverse geocoding API.
const getCityFromCoords = async (lat: number, lon: number): Promise<string> => {
    // For this mock, we'll just create a name from coords.
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Coords ${lat.toFixed(2)}, ${lon.toFixed(2)}`)
        }, 300);
    });
}


export const fetchWeatherDataByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    // In a real app, you would make an API call to OpenWeatherMap or similar with lat/lon.
    // For this mock, we'll use our mock reverse geocoder and then generate weather data.
    const locationName = await getCityFromCoords(lat, lon);
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = generateWeatherData(locationName);
            resolve(data);
        }, 900); // Simulate network delay
    });
}

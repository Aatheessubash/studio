
export interface ForecastItem {
  day: string;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy' | 'Stormy';
  temp: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: ForecastItem['condition'];
  forecast: ForecastItem[];
  lat?: number;
  lon?: number;
}

const API_KEY = "a5bf6c5488d299dd15e60fc52509d006";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";


async function processWeatherData(data: any): Promise<WeatherData | null> {
    if (!data || !data.list || data.list.length === 0) {
        return null;
    }
    const current = data.list[0];
    const location = `${data.city.name}, ${data.city.country}`;
    const { lat, lon } = data.city.coord;

    const getCondition = (main: string): WeatherData['condition'] => {
      switch (main) {
        case 'Clear': return 'Sunny';
        case 'Clouds': return 'Cloudy';
        case 'Rain': return 'Rainy';
        case 'Thunderstorm': return 'Stormy';
        case 'Drizzle': return 'Partly Cloudy';
        default: return 'Cloudy';
      }
    };

    const dailyForecastMap = new Map<string, ForecastItem>();
    for (const item of data.list) {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      if (!dailyForecastMap.has(date)) {
        dailyForecastMap.set(date, {
          day: date,
          condition: getCondition(item.weather[0].main),
          temp: Math.round(item.main.temp),
        });
      }
      if (dailyForecastMap.size >= 3) break;
    }

    return {
      location,
      temperature: Math.round(current.main.temp),
      humidity: current.main.humidity,
      condition: getCondition(current.weather[0].main),
      forecast: Array.from(dailyForecastMap.values()),
      lat,
      lon
    };
}


export async function fetchWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return processWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data by city:", error);
    return null;
  }
}

export async function fetchWeatherDataByCoords(lat: number, lon: number): Promise<WeatherData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        return processWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data by coords:", error);
        return null;
    }
}

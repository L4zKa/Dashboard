import { Button } from "@fluentui/react-components";
import { useEffect, useState, type JSX } from "react";

type CurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
};

type OpenMeteoResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  current_weather: CurrentWeather;
};

// Open-Meteo weather code mapping
const weatherCodes: Record<number, string> = {
  0: "☀️ Clear sky",
  1: "🌤️ Mainly clear",
  2: "⛅ Partly cloudy",
  3: "☁️ Overcast",
  45: "🌫️ Fog",
  48: "🌫️ Depositing rime fog",
  51: "🌦️ Light drizzle",
  53: "🌧️ Moderate drizzle",
  55: "🌧️ Dense drizzle",
  61: "🌦️ Slight rain",
  63: "🌧️ Moderate rain",
  65: "🌧️ Heavy rain",
  66: "🌨️ Light freezing rain",
  67: "🌨️ Heavy freezing rain",
  71: "🌨️ Slight snow fall",
  73: "❄️ Moderate snow fall",
  75: "❄️ Heavy snow fall",
  77: "🌨️ Snow grains",
  80: "🌦️ Slight rain showers",
  81: "🌧️ Moderate rain showers",
  82: "🌧️ Violent rain showers",
  85: "❄️ Slight snow showers",
  86: "❄️ Heavy snow showers",
  95: "⛈️ Thunderstorm",
  96: "⛈️ Thunderstorm with slight hail",
  99: "⛈️ Thunderstorm with heavy hail",
};

export default function WeatherOelde(): JSX.Element {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather(): Promise<void> {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=51.8281&longitude=8.1472&current_weather=true"
      );
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: OpenMeteoResponse = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  }
  if (!weather) return <p>Weather data unavailable.</p>;

  const description: string = weatherCodes[weather.weathercode] ?? "🌍 Unknown";
  const temp: number = Math.round(weather.temperature);

  return weather ? (
    <>
      <div style={{ display: "flex" }}>
        <h2>🌦️ Weather Oelde</h2>
        <Button /* icon={} */ size="small"></Button>
      </div>
      <p style={{ fontSize: "2rem", margin: "8px 0" }}>{temp}°C</p>
      <p style={{ fontSize: "1.2rem", margin: 0 }}>{description}</p>
      <p style={{ marginTop: 6, color: "#555" }}>
        💨 {weather.windspeed} km/h wind
      </p>
      <p style={{ fontSize: "0.8rem", color: "#888" }}>
        Updated: {new Date(weather.time).toLocaleTimeString("de-DE")}
      </p>
    </>
  ) : loading ? (
    <p>Loading weather...</p>
  ) : (
    <p>Something went wrong</p>
  );
}

import { useEffect, useMemo, useState } from "react";
import { IWeatherDoc } from "./types";
import Card from "./card";

const Weather = ({ data }: { data: IWeatherDoc[] }) => {
  const [weatherData, $weatherData] = useState<IWeatherDoc[]>(data);
  const [selectedCity, $selectedCity] = useState<string>("");

  useEffect(() => {
    $weatherData(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return selectedCity === ""
      ? weatherData
      : weatherData.filter((w) => w.city === selectedCity);
  }, [selectedCity, weatherData]);

  return (
    <div className="col-span-1 p-4">
      <h2 className="mb-10">Weather</h2>

      <div className="mb-4 w-full">
        <select
          value={selectedCity}
          onChange={(e) => $selectedCity(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">All Cities</option>
          {Array.from(new Set(weatherData.map((w) => w.city))).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {filteredData.map((weather) => (
          <Card key={weather.city}>
            <h3 className="font-semibold">
              {weather.city}({weather.temperature}°C)
            </h3>
            <div className="capitalize">{weather.condition}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Weather;

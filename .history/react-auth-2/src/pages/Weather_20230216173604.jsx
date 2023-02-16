import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ location, apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`http://localhost:8080/api/weatherData/jamshoro`);
      setWeatherData(response.data);
    };
    fetchData();
  }, [location, apiKey]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const temperature = weatherData.main.temp;
  const weather = weatherData.weather[0].main;

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-2">{location}</h2>
      <div className="flex items-center">
        <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weather} className="w-16 h-16 mr-4" />
        <div>
          <div className="text-4xl font-bold">{temperature}&deg;C</div>
          <div className="text-xl">{weather}</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchWeather, setSearchWeather] = useState("jamshoro");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`http://localhost:8080/api/weatherData/${searchWeather}`);
            setWeatherData(response.data);
        };
        fetchData();
    }, []);

    if (!weatherData) {
        return <div className="text-2xl font-bold text-center px-56 pt-24">
                    <h1>Loading....</h1>
                </div>
    }

    const temperature = weatherData.temp;
    const weather = weatherData.weather;
    const location = weatherData.location;
    const weatherIcon = weatherData.weatherIcon;

    return (
        <div className="bg-gray-200 rounded-lg p-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">{location}</h2>
            <div className="flex items-center text-center">
                <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weather} className="w-16 h-16 mr-4" />
                <div>
                <div className="text-4xl font-bold">{temperature}&deg;C</div>
                <div className="text-xl">{weather}</div>
                </div>
            </div>
        </div>
    );
};

export default Weather;

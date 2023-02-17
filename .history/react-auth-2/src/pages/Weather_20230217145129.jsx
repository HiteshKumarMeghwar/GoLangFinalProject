import { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchWeather, setSearchWeather] = useState("jamshoro");

    const {
        register,
        handleSubmit,
        // watch,
        formState: {errors},
        reset
    } = useForm();
    const inputRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`http://localhost:8080/api/weatherData/${searchWeather}`)
            .then(function(response) {
                // handle access .....
                setWeatherData(response.data);
                if(response.status === 200 && searchWeather === response.data.location){
                    setLoading(false);
                }
            }).catch(function(error) {
                console.log(error)
            })
        };
        fetchData();
    }, [searchWeather])
    

    const onSubmit = (data) => {
        setLoading(true);
        setSearchWeather(data?.name);
        reset();
    };

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
        <>
            <div className="bg-gray-200 rounded-lg p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">{location}</h2>
                <div className="flex items-center">
                    <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={weather} className="w-16 h-16 mr-4" />
                    <div>
                    <div className="text-4xl font-bold">{temperature}&deg;C</div>
                    <div className="text-xl">{weather}</div>
                    </div>
                </div>
            </div>
            <div className=" justify-center min-h-screen overflow-hidden pt-3">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center">
                    Search Any Location Weather Details
                    </h1>
                    <form method='POST' className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label
                                for="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Location Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id='name'
                                // autoComplete='on'
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("name", {
                                required: true,
                                })}
                                ref={(e) => {
                                    inputRef.current = e;
                                    register(e, { required: true });
                                }}
                            />
                            <div>
                            {errors.name && errors.name.type === "required" && (
                                <span
                                role="alert"
                                className="text-red-600 text-[10px] italic"
                                >
                                Location Name is required
                                </span>
                            )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className={`w-full ${
                            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                            } text-white font-bold py-2 px-4 rounded`}
                            disabled={loading ? true : false}
                            >
                            {loading ? "Loading...":"Search Weather"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Weather;

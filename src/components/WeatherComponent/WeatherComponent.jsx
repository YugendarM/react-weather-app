import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import partlyCloud from '../../assets/videos/partly-cloud.mp4'
import HeavyRain from '../../assets/videos/rainy.mp4'
import defaultCondition from '../../assets/videos/defaultWeather.mp4'

const WeatherComponent = () => {
    const API_KEY = "9fe3fd22df60471a86694356241103";
    const [cityName, setCityName] = useState("");
    const [coordinates, setCoodinates] = useState({
        latitude:"",
        longitude:""
    })

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        console.log("useEffect called");
        navigator.geolocation.getCurrentPosition((position) => {                  
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoodinates({latitude:latitude, longitude:longitude})
            setCityName(weatherData.current.location.name)
        })
        getCurrentLocationWeather();
    },[coordinates.latitude, coordinates.longitude])

    const getCurrentLocationWeather = async () => {
        
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coordinates.latitude},${coordinates.longitude}`)
            console.log(response.data);
            setWeatherData(response.data)
    }


    const getWeatherData = async({queryKey}) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
        console.log(response.data);
        setWeatherData(response.data);
        // return response.data;

    }

    console.log(weatherData.current && weatherData.current.condition.text);


    // const {data , status, isLoading, isError} = useQuery('weatherData', getWeatherData)

    // if(isLoading){
    //     return <div className='bg-cloud-bg gap-10 bg-cover h-[100vh]'>Loading...</div>
    // }
    // if(isError){
    //     return <div>Error..</div>
    // }

    // console.log(data);
    
    const handleCityName = (event) => {
        setCityName(event.target.value);
    
    }


    /*
    Partly cloud
    Mist
    Clear
    Sunny
    Cloudy
    Overcast
    Patchy rain possible
    Patchy snow possible
    Patchy sleet possible
    Patchy freezing drizzle possible
    Thundery outbreaks possible
    Blowing snow
    Blizzard
    Fog
    Freezing fog
    Patchy light drizzle
    Light drizzle
    Freezing drizzle
    Light rain
    Moderate rain at times
    Heavy rain
    Light snow
    Ice pellets
    Moderate or heavy rain shower
    
    */
   let weatherCondition;
   
    if(weatherData.current){
        switch(weatherData.current.condition.code){
            // case 1000: weatherCondition = Sunny; break;
            case 1003: weatherCondition = partlyCloud; break;
            // case 1006: weatherCondition = Cloudy; break;
            // case 1009: weatherCondition = overCast; break;
            // case 1030: weatherCondition = Mist; break;
            // case 1063: weatherCondition = PatchySnow; break;
            // case 1087: weatherCondition = ThunderyOutbreaks; break;
            // case 1135: weatherCondition = Fog; break;
            // case 1183: weatherCondition = LightRain; break;
            case 1195: weatherCondition = HeavyRain; break;
            default: weatherCondition = "";
        }
    }
    
  return (
    <React.Fragment>
      <video 
        className=' h-[100vh] w-[100vw] object-cover bg-cloud-bg bg-cover bg-fixed fixed top-0'
        src={weatherCondition}
        autoplay="{true}" 
        loop 
        muted>
    </video>

      <section  className='absolute top-0  mx-auto lg:px-64 flex flex-col items-center h-[100vh] w-[100vw] py-14 lg:py-24 z-20'>
        {
            weatherData.current && 
            <div className=' flex flex-col items-center gap-10'>
                
                <div className='flex flex-col items-center gap-1 lg:gap-2'>

                    {weatherData.current && <p className='text-3xl '>{ weatherData.location.name}, {weatherData.location && weatherData.location.region}</p>}


                    <div className='flex items-center gap-2'>
                        {weatherData.current && <img className='h-12' src={weatherData.current.condition.icon}/>}
                        {weatherData.current && <p className='text-2xl text-center font-bold'>{weatherData.current.temp_c}&deg; C</p> }
                    </div>

                    {weatherData.current && <p className='text-3xl '>{weatherData.current.condition.text}</p> }


                </div>
                <div className='flex items-center rounded-full bg-white px-2  w-96'>
                    <input 
                        className='w-4/5 px-3 py-3 rounded-full focus:outline-none'
                        placeholder='Enter the city'
                        value={cityName}
                        onChange={handleCityName}
                    />
                    <button className='w-2/5 bg-blue-400 lg:px-3 py-1.5 rounded-full text-white' onClick={getWeatherData}>Get Weather</button>

                </div>

                <div>
                { weatherData && 
                    <div className='flex gap-10 md:gap-20 flex-wrap  content-center justify-center'>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-semibold text-center'>{weatherData.current && weatherData.current.temp_c}&deg; C</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-semibold text-center'>{weatherData.current && weatherData.current.temp_f}&deg; F</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-normal text-center'>Pressure {weatherData.current && <span className='font-medium'>{weatherData.current.pressure_in} in</span>}</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-normal text-center'>Wind Speed: {weatherData.current && <span className='font-medium'>{weatherData.current.wind_kph} km/h</span>}</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-lg md:text-xl font-normal text-center'>
                            Wind Direction: { 
                            weatherData.current && 
                            <span className='font-medium text-xl'>
                                {weatherData.current.wind_dir === "SSE" ? "South-Southeast" :
                                 weatherData.current.wind_dir === "WSW" ? "West-SouthWest" : 
                                 weatherData.current.wind_dir === "S" ? "South" : 
                                 "East"}
                            </span>}
                        </p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-normal text-center'>Humidity: {weatherData.current && <span className='font-medium'>{weatherData.current.humidity}%</span>}</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-normal text-center'>Wind Speed: {weatherData.current && <span className='font-medium'>{weatherData.current.wind_kph} km/h</span>}</p>
                        <p className='h-24 md:h-28 w-36 md:w-44 flex flex-col items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md  text-xl md:text-2xl font-normal text-center'>Wind Degree: {weatherData.current && <span className='font-medium'>{weatherData.current.wind_degree} &deg;</span>}</p>
                    </div>


                }
                </div>
            </div>
        }
      </section>
    </React.Fragment>
  )
}

export default WeatherComponent

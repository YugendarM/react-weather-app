import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

const WeatherComponent = () => {
    const API_KEY = "9fe3fd22df60471a86694356241103";
    const [cityName, setCityName] = useState("");
    const [coordinates, setCoodinates] = useState({
        latitude:"",
        longitude:""
    })

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [weatherData, setWeatherData] = useState([]);
    const [location, setLocation] = useState("");

    useEffect(() => {
        console.log("useEffect called");
        navigator.geolocation.getCurrentPosition((position) => {                  
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoodinates({latitude:latitude, longitude:longitude})
            setCityName(weatherData.current.location.name)
            // setLocation(latitude + "," + longitude)
        })
        getCurrentLocationWeather();
    },[coordinates.latitude, coordinates.longitude])

    const getCurrentLocationWeather = async () => {
        
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coordinates.latitude},${coordinates.longitude}`)
            console.log(response.data);
            setWeatherData(response.data)
    }

    // const getCurrentLocation = async() => {
    //       navigator.geolocation.getCurrentPosition((position) => {                  
    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //         // setCoodinates({latitude:latitude, longitude:longitude})
    //         // setLocation(latitude + "," + longitude)
    //         console.log();
    //     })
    // }

    // const getCurrentLocationWeather = async () => {
        
    //     navigator.geolocation.getCurrentPosition(async(position) => {                  
    //         const lat = position.coords.latitude;
    //         const long = position.coords.longitude;
    //         // setCoodinates({latitude:latitude, longitude:longitude})
    //         // setLocation(latitude + "," + longitude)
    //         setLatitude(lat);
    //         setLongitude(long);
    //         console.log();
        
       
    //     })
    //     const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
    //     console.log(response.data);
    //     // setWeatherData(response.data);
    //     return response.data;
    
    // }

    const getWeatherData = async({queryKey}) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${queryKey[1]}`)
        console.log(response.data);
        // setWeatherData(response.data);
        return response.data;
    }


    const {data,isLoading, isError} = useQuery(["weatherData",cityName], getWeatherData, {keepPreviousData: true});

    if(isLoading){
        return <div>Loading..</div>
    }

    if(isError){
        return <div>Error...</div>
    }
    

    const handleCityName = (event) => {
        setCityName(event.target.value);
    
    }

    
  return (
    <React.Fragment>
      <section  className='container mx-auto px-80 flex flex-col items-center h-[100vh] py-28 bg-cloud-bg gap-10 bg-cover'>

        <div>

            {weatherData.current && <p className='text-3xl '>{ weatherData.location.name}, {weatherData.location && weatherData.location.region}</p>}
            

            {weatherData.current && <p className='text-2xl text-center font-bold'>{weatherData.current.temp_c}&deg; C</p> }

        </div>
        <div className='rounded-full bg-white px-2'>
            <input 
                className='w-72 px-3 py-3 rounded-full focus:outline-none'
                placeholder='Enter the city'
                value={cityName}
                onChange={handleCityName}
            />
            <button className='bg-blue-400 px-3 py-1.5 rounded-full text-white' onClick={getWeatherData}>Get Weather</button>
        
        </div>

        {/* <div>
            { data && 
                <div className='flex gap-20 flex-wrap  content-center justify-center'>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.temp_c}&deg; C</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.temp_f}&deg; F</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.pressure_in}</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.wind_kph}</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.wind_dir}</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.humidity}</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.vis_km}</p>
                    <p className='h-24 w-36 flex items-center justify-center bg-gray-700 text-white bg-opacity-80 rounded-md text-2xl font-semibold'>{data.current.wind_degree}</p>
                </div>


            }

            
        </div> */}
      </section>
    </React.Fragment>
  )
}

export default WeatherComponent

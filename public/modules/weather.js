// const {ClearErrorField} = require("./validation");
import {ClearErrorField} from "/modules/validation.js";

export const GetWeatherData = async (latitude, longitude) => {
    try {
        ClearErrorField();
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=65e593fa4d57b60fef88e0a43cc6b3bb`)
        const locationWeather = await result.json();
        return {
            temperature: locationWeather.main.temp,
            coords: locationWeather.coord,
            windSpeed: locationWeather.wind.speed,
            iconName: locationWeather.weather[0].icon,
        };
    } catch (error) {
        console.log(error.message);
    }
}

// module.exports = GetWeatherData;

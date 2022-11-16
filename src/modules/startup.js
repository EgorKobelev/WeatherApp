import {ValidateValues} from "./validation.js";
import {GetWeatherData} from "./weather.js";
import {CreateArticle} from "./article.js";

const GetValues = (event) => {
    event.preventDefault();
    const latitude = form.querySelector('[name="latitude"]');
    const longitude = form.querySelector('[name="longitude"]');
    if (ValidateValues([latitude.value.trim(), longitude.value.trim()])) {
        GetWeatherData(latitude.value.trim(), longitude.value.trim()).then( (weatherData)  => {
            CreateArticle(weatherData);
        })
    }
}

const form = document.getElementById("request-coordinates__form")
form.addEventListener("submit", GetValues)


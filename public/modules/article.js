// const maps = require("./map.js")
// const KtoC = require("./helper");

import {KtoC} from "./helper.js"
import {ShowMap, DeleteArticleOnClick} from "./map.js";

export const CreateArticle = (weatherData) => {
    const listElement = document.createElement("li");
    const paragraphTemperature = document.createElement("p");
    const paragraphLatitude = document.createElement("p");
    const paragraphLongitude = document.createElement("p");
    const paragraphWind = document.createElement("p");
    const image = document.createElement("img");
    const buttonMap = document.createElement("button")
    const buttonDelete = document.createElement("button");
    const hiddenParagraph = document.createElement("p")
    hiddenParagraph.classList.add("get-coordinates__p", "get-coordinates__p--hidden")
    hiddenParagraph.id = "cords-hidden"
    listElement.classList.add("get-coordinates__item");
    paragraphTemperature.classList.add("get-coordinates__p", "get-coordinates__p--temperature");
    paragraphLatitude.classList.add("get-coordinates__p", "get-coordinates__p--latitude");
    paragraphLongitude.classList.add("get-coordinates__p", "get-coordinates__p--longitude");
    buttonMap.classList.add("btn", "btn-reset", "get-coordinates__button", "get-coordinates__button--map")
    buttonDelete.classList.add("btn", "btn-reset", "get-coordinates__button", "get-coordinates__button--delete", "btn--delete");
    paragraphWind.classList.add("get-coordinates__p", "get-coordinates__p--wind");
    image.classList.add("get-coordinates__image");
    paragraphTemperature.textContent = "Температура: " + KtoC(weatherData.temperature) + "°";
    paragraphLatitude.textContent = "Широта: " + weatherData.coords.lat;
    paragraphLongitude.textContent = "Долгота: " + weatherData.coords.lon;
    paragraphWind.textContent = "Скорость ветра: " + weatherData.windSpeed + ' м/c';
    image.src = `https://openweathermap.org/img/w/${weatherData.iconName}.png`;
    hiddenParagraph.textContent = `${weatherData.coords.lat} ${weatherData.coords.lon}`
    buttonMap.onclick = ShowMap;
    buttonMap.textContent = "Карта"
    buttonDelete.onclick = DeleteArticleOnClick;
    buttonDelete.textContent = "Удалить";
    listElement.append(paragraphLatitude, paragraphLongitude, paragraphTemperature, paragraphWind, image, buttonMap, buttonDelete, hiddenParagraph)
    const list = document.querySelector('.get-coordinates__list');
    list.append(listElement);
}

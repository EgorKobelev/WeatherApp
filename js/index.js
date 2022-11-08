const KtoC = (temperatureF) => {
    return Math.floor((parseFloat(temperatureF) - 273));
}

const GetHiddenCords = (text) => {
    const listCords = text.split(" ");
    return {
        lat: parseFloat(listCords[0]),
        lon: parseFloat(listCords[1]),
    }
}

const CreateMapContainer = () => {
    const mapContainer = document.createElement("div");
    const map = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const paragraph = document.createElement("p");
    paragraph.classList.add("map-container__paragraph");
    buttonDelete.classList.add("btn", "btn-reset", "map-container__button--delete", "btn--delete");
    mapContainer.classList.add("map-container");
    map.classList.add("map");
    mapContainer.id = "map-container";
    map.id = "map";
    paragraph.textContent = "Карта";
    buttonDelete.onclick = DeleteMapEvent;
    buttonDelete.textContent = "Удалить";
    mapContainer.append(paragraph, buttonDelete);
    document.body.append(mapContainer,map);
}

const DeleteMapEvent = () => {
    const map = document.getElementById("map");
    const mapContainer = document.getElementById("map-container");
    map.parentNode.removeChild(map);
    mapContainer.parentNode.removeChild(mapContainer);

}

const DeleteMap = (map) => {
    if (!map) {
        map = document.getElementById("map");
    }
    if (map) {
        map.parentNode.removeChild(map);
        const mapContainer = document.getElementById("map-container");
        mapContainer.parentNode.removeChild(mapContainer);
    }
}

const ShowMap = () => {
    const map = document.getElementById("map");
    if (map) {
        DeleteMap(map);
    }
    CreateMapContainer()
    ymaps.ready(init);
    function init(){
        const hiddenElement = document.getElementById("cords-hidden");
        const cords = GetHiddenCords(hiddenElement.textContent);
        const myMap = new ymaps.Map("map", {
            center: [cords.lat, cords.lon], //создать пустой элемент внутри карточки с данными о координатах
            zoom: 7
        });
    }
}

const DeleteArticleOnClick = (event) => {
    const button = event.target;
    button.parentNode.parentNode.removeChild(button.parentNode);
}

const CreateArticle = (weatherData) => {
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

const GetWeatherData = async (latitude, longitude) => {
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

const ShowErrors = (error) => {
    const errorField = document.querySelector(".request-coordinates__p--error")
    if (!errorField) {
        const paragraphError = document.createElement("p");
        paragraphError.classList.add("request-coordinates__p", "request-coordinates__p--error");
        paragraphError.textContent = error.message;
        const searchBlock = document.querySelector(".request-coordinates__container")
        searchBlock.insertBefore(paragraphError, form);
    } else if(errorField.textContent !== error.message) {
        errorField.textContent = error.message;
    }
}

const ClearErrorField = () => {
    const errorField = document.querySelector(".request-coordinates__p--error")
    if (errorField){
        errorField.parentNode.removeChild(errorField);
    }
}


const ValidateValues = (values) => {
    const firstValue = parseFloat(values[0]);
    const secondValue = parseFloat(values[1]);
    if (typeof(firstValue) === "number" && typeof(secondValue) === "number" &&
    !isNaN(firstValue) && !isNaN(secondValue)) {
        if (firstValue >= -90 && firstValue <= 90 && secondValue >= -180 && secondValue <= 180){
            return true;
        }
        ShowErrors(new Error("Неправильный диапазон значений"))
        return false;
    } else {
        ShowErrors(new Error("Некорректный тип вводимых данных"))
        return false;
    }
}

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

//alert("Используйте vpn: рекомендуется ninja vpn. При подключении указывать европейские регионы - Германия, Франция и тд")
const form = document.getElementById("request-coordinates__form")
form.addEventListener("submit", GetValues)


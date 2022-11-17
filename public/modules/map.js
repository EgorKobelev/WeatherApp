export const ShowMap = () => {
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

export const DeleteArticleOnClick = (event) => {
    const button = event.target;
    button.parentNode.parentNode.removeChild(button.parentNode);
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

const GetHiddenCords = (text) => {
    const listCords = text.split(" ");
    return {
        lat: parseFloat(listCords[0]),
        lon: parseFloat(listCords[1]),
    }
}

// module.exports = {ShowMap, DeleteArticleOnClick}
export const ValidateValues = (values) => {
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

export const ClearErrorField = () => {
    const errorField = document.querySelector(".request-coordinates__p--error")
    if (errorField){
        errorField.parentNode.removeChild(errorField);
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

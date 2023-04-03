// variávies e seleção de elemenos
/*
 *  chave de api deve ser obtida por: https://openweathermap.org/api
 */
const apikey = ""
const apiCountryURL = "https://www.countryflagicons.com/SHINY/64/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessage = document.querySelector("#error-message")

const body = document.querySelector("body")
//Funções



const toggleLoader = () => {
    loader.classList.toggle("hide");
};



const getWeatherData = async (city) => {
    toggleLoader()
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)


    toggleLoader()
    const data = await res.json()

    if (data.cod === "404") {
        errorMessage.classList.remove("hide");

        weatherContainer.classList.add("hide")
        return;
    }
    errorMessage.classList.add("hide");

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".png");
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
    weatherContainer.classList.remove("hide")





}
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value
    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter" || e.code === "NumpadEnter") {
        const city = e.target.value;

        showWeatherData(city)
    }
})


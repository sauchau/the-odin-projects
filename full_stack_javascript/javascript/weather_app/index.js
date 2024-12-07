async function getDataFromAPI(location) {
    const API_KEY = "K3UTLDV5TPW8T95D439A78X4P"
    const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`
    const response = await fetch(API_URL)
    const json = await response.json()

    return json
}

async function getWeather(location) {
    const data = await getDataFromAPI(location)
    return {
        "address": data["resolvedAddress"],
        "temperature": data["currentConditions"]["temp"],
        "conditions": data["currentConditions"]["conditions"],
        "description": data["description"]
    }
}

const locationInput = document.querySelector("#location-text-field")
const getWeatherBtn = document.querySelector("#get-weather-btn")
const weatherInfo = document.querySelector("#weather-info")
const loading = document.querySelector("#loading")

getWeatherBtn.addEventListener("click", (e) => {
    e.preventDefault()

    loading.classList.toggle("hidden")
    if (!weatherInfo.classList.contains("hidden")) {
        weatherInfo.classList.toggle("hidden")
    }

    getWeather(locationInput.value)
        .then(data => {
            Object.entries(data).forEach(([key, value], i) => {
                if (i === 1) {
                    weatherInfo.children[i].innerText = value + "℉"
                } else {
                    weatherInfo.children[i].innerText = value
                }
            })
            loading.classList.toggle("hidden")
            weatherInfo.classList.toggle("hidden")
        })
        .catch(() => {
            loading.classList.toggle("hidden")
        })
})
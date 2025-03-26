// API Key and Base URL for OpenWeather API
const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeather API key
const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const cityNameElem = document.getElementById("city-name");
const temperatureElem = document.getElementById("temperature");
const weatherConditionElem = document.getElementById("weather-condition");
const weatherIconElem = document.getElementById("weather-icon");
const humidityElem = document.getElementById("humidity");
const windSpeedElem = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        showErrorMessage("Please enter a city name.");
    }
});

// Fetch Weather Data from API
async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found. Please try again.");
        
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        showErrorMessage(error.message);
    }
}

// Update Weather Information on the Page
function updateWeatherInfo(data) {
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
    weatherConditionElem.textContent = `Condition: ${data.weather[0].description}`;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElem.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherResult.style.display = "block";  // Show the weather info
    errorMessage.textContent = "";  // Clear any error messages
}

// Show Error Message
function showErrorMessage(message) {
    errorMessage.textContent = message;
    weatherResult.style.display = "none";  // Hide the weather info
}

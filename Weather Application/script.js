
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    cityName.textContent = city;
    temperature.textContent = "Loading...";
    description.textContent = "";

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find the city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please try another name.");
        }

        const place = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to load weather data.");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        cityName.textContent = `${place.name}, ${place.country}`;
        temperature.textContent = `${current.temperature_2m}°C`;
        description.textContent =
            `Feels like ${current.apparent_temperature}°C | ` +
            `Humidity: ${current.relative_humidity_2m}% | ` +
            `Wind: ${current.wind_speed_10m} km/h | ` +
            `Weather code: ${current.weather_code}`;

    } catch (error) {
        temperature.textContent = error.message;
        description.textContent = "";
    }
});

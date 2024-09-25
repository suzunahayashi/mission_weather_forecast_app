import $ from 'jquery';
import '../scss/style.scss';
import { fetchWeather, fetchWeatherByCoordinates } from './modules/weather.js';

document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'c4722c3a2462f945d6ac2e6e959805ad';

    const weatherData = await fetchWeather(city, apiKey);
    if (weatherData) {
        displayCurrentWeather(weatherData);
        displayFiveDayForecast(weatherData.forecast);
    } else {
        alert('都市が見つかりません。都市名は英語で入力してください');
    }
});

document.getElementById('currentLocationButton').addEventListener('click', async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'c4722c3a2462f945d6ac2e6e959805ad';
            const weatherData = await fetchWeatherByCoordinates(latitude, longitude, apiKey);
            displayCurrentWeather(weatherData);
            displayFiveDayForecast(weatherData.forecast);
        });
    } else {
        alert('このブラウザでは位置情報が使用できません。');
    }
});

function displayCurrentWeather(weatherData) {
    document.getElementById('cityName').textContent = weatherData.cityName;
    document.getElementById('temperature').textContent = `${weatherData.temperature} °C`;
    document.getElementById('weatherDescription').textContent = weatherData.description;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
}

function displayFiveDayForecast(forecast) {
    const forecastContainer = document.getElementById('fiveDayForecast');
    forecastContainer.innerHTML = '';

    forecast.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <h3>${day.date}</h3>
            <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="天気アイコン" />
            <p>${day.temperature} °C</p>
            <p>${day.description}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

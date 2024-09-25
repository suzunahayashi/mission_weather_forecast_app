const fetchWeather = async (city, apiKey) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`);
    if (!response.ok) {
        return null; // Handle city not found
    }
    const data = await response.json();
    return {
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        forecast: await fetchFiveDayForecast(data.coord.lat, data.coord.lon, apiKey) // Get forecast based on coordinates
    };
};

const fetchWeatherByCoordinates = async (lat, lon, apiKey) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`);
    if (!response.ok) {
        return null; // Handle error
    }
    const data = await response.json();
    return {
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        forecast: await fetchFiveDayForecast(lat, lon, apiKey) // Get forecast based on coordinates
    };
};

const fetchFiveDayForecast = async (lat, lon, apiKey) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`);
    if (!response.ok) {
        return null; // Handle error
    }
    const data = await response.json();
    return data.list.filter((item) => item.dt_txt.includes("12:00:00")).map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon
    }));
};

export { fetchWeather, fetchWeatherByCoordinates };

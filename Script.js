const apiKey = 'f7a094387bcb6cb8563507dec165cebb';

async function fetchWeatherData(city = null, coords = null) {
    let url;
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    } else if (coords) {
        const { latitude, longitude } = coords;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
        alert('Unable to fetch weather data.');
    }
}

function updateWeatherUI(data) {
    const description = document.querySelector('.description');
    const temperature = document.querySelector('.temperature');
    const humidity = document.querySelector('.humidity');
    const location = document.querySelector('.location');
    const windSpeed = document.querySelector('.wind-speed');
    const country = document.querySelector('.country');

    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    location.textContent = `Location: ${data.name}`;
    country.textContent = `Country: ${data.sys.country}`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
}

document.querySelector('.search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.querySelector('.city-input').value;
    fetchWeatherData(city);
    document.querySelector('.city-input').value = '';
});

document.querySelector('.location-btn').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(null, position.coords);
            },
            (error) => {
                alert('Unable to retrieve your location.');
                console.error(error);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

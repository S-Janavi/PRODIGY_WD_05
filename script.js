const apiKey = '3429d49f1742283e2be536487b0e5e06';

document.getElementById('get-weather').addEventListener('click', function() {
    const locationInput = document.getElementById('location-input').value;
    if (locationInput) {
        fetchWeatherByCity(locationInput);
    } else {
        getLocation();
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, (error) => {
            alert('Geolocation not supported or permission denied.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data.');
        });
}

function displayWeather(data) {
    const city = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    document.getElementById('city-name').textContent = `Weather in ${city}`;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = `${description}`;
    document.getElementById('humidity').textContent += `${humidity}%`;
    document.getElementById('wind-speed').textContent += `${windSpeed} m/s`;
    document.getElementById('sunrise').textContent += `Sunrise: ${sunrise}`;
    document.getElementById('sunset').textContent += `Sunset: ${sunset}`;

    const weatherContainer = document.getElementById('weather-details');
    weatherContainer.classList.add('show');
}

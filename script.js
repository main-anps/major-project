const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationNameElement = document.getElementById('locationName');
const currentConditionElement = document.getElementById('currentCondition');
const currentTemperatureElement = document.getElementById('currentTemperature');
const currentHumidityElement = document.getElementById('currentHumidity');
const currentWindSpeedElement = document.getElementById('currentWindSpeed');
const currentDateTimeElement = document.getElementById('currentDateTime');
const forecastVisualization = document.getElementById('forecastVisualization');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetchWeatherData(location);
    }
});

function fetchWeatherData(location) {
    const currentWeatherUrl = `${apiUrl}/weather?q=${location}&units=metric&appid=${apiKey}`;
    const forecastUrl = `${apiUrl}/forecast?q=${location}&units=metric&appid=${apiKey}`;

  
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            locationNameElement.textContent = data.name + ', ' + data.sys.country;
            currentConditionElement.textContent = data.weather[0].description;
            currentTemperatureElement.textContent = data.main.temp;
            currentHumidityElement.textContent = data.main.humidity;
            currentWindSpeedElement.textContent = data.wind.speed;
            currentDateTimeElement.textContent = new Date(data.dt * 1000).toLocaleString();
        })
        .catch((error) => {
            console.error('Error fetching current weather data:', error);
        });

    
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            const dailyForecasts = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

            forecastVisualization.innerHTML = '';
            dailyForecasts.forEach((forecast) => {
                const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
                const forecastTemperature = forecast.main.temp;
                const forecastHumidity = forecast.main.humidity;
                const forecastCondition = forecast.weather[0].description;

                const forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast-card');
                forecastCard.innerHTML = `
                    <h3>${forecastDate}</h3>
                    <p>Temp: ${forecastTemperature}&deg;C</p>
                    <p>Humidity: ${forecastHumidity}%</p>
                    <p>Condition: ${forecastCondition}</p>
                `;

                forecastVisualization.appendChild(forecastCard);
            });
        })
        .catch((error) => {
            console.error('Error fetching forecast data:', error);
        });
}


fetchWeatherData('Delhi');

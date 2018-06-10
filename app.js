var html = document.querySelector('html');
var city = document.getElementById('city');
var container = document.querySelector('.container');
var country = document.getElementById('country');
var humidity = document.getElementById('humidity');
var innerContainer = document.querySelector('.innerContainer');
var noLocation = document.querySelector('.noLocation');
var temp = document.getElementById('temp');
var weatherDescription = document.getElementById('weatherDescription');
var wind = document.getElementById('wind');
var unitToggleBox = document.querySelector('.unitToggleBox');
var unitIsFahrenheit = false;

document.querySelector('input').addEventListener('click', function () {
    unitIsFahrenheit ? unitIsFahrenheit = false : unitIsFahrenheit = true;
    if (unitIsFahrenheit) {
        temp.textContent = Math.round(parseInt(temp.textContent, 10) * 1.8 + 32) + ' °F';
        wind.textContent = Math.round(parseInt(wind.textContent, 10) / 1.609344) + ' mph';
    } else {
        temp.textContent = Math.round((parseInt(temp.textContent, 10) - 32) / 1.8) + ' °C';
        wind.textContent = Math.round(parseInt(wind.textContent, 10) * 1.609344) + ' km/h';
    }
});

function showWeather(weatherData) {
    var weatherID = weatherData.weather[0].id;
    if (weatherID >= 200 && weatherID <= 531) {
        html.style.backgroundImage = 'url("./images/rain.jpg")';
    } else if (weatherID >= 600 && weatherID <= 622) {
        html.style.backgroundImage = 'url("./images/snow.jpg")';
    } else if (weatherID >= 701 && weatherID <= 781) {
        html.style.backgroundImage = 'url("./images/mist.jpg")';
    } else if (weatherID === 800) {
        html.style.backgroundImage = 'url("./images/clear-sky.jpg")';
    } else if (weatherID >= 801 && weatherID <= 804) {
        html.style.backgroundImage = 'url("./images/clouds.jpg")';
    } else if ((weatherID >= 900 && weatherID <= 906) || (weatherID >= 951 && weatherID <= 962)) {
        html.style.backgroundImage = 'url("./images/wind.jpg")';
    }
    container.style.backgroundColor = '#dadee5';
    container.style.color = '#000';
    city.textContent = weatherData.name;
    country.textContent = weatherData.sys.country;
    weatherDescription.textContent = weatherData.weather[0].main;
    unitToggleBox.style.display = 'block';
    innerContainer.style.display = 'flex';
    temp.textContent = Math.round(weatherData.main.temp) + ' °C';
    humidity.textContent = Math.round(weatherData.main.humidity) + ' %';
    wind.textContent = Math.round(weatherData.wind.speed * 3.6) + ' km/h';
}

function getWeather(lat, long) {
    var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var weatherData = request.response;
        showWeather(weatherData);
    }
}

if ('geolocation' in navigator) {
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }

    function error(err) {
        container.style.display = 'none';
        noLocation.style.display = 'flex';
        html.style.backgroundImage = 'url("./images/Null_Island_2017.jpg")';
    }
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    container.style.display = 'none';
    noLocation.style.display = 'flex';
    html.style.backgroundImage = 'url("./images/Null_Island_2017.jpg")';
}
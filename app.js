const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector("#search");
const weatherIcon = document.querySelector(".weather-icon");
const appContainer = document.querySelector(".app-container");

// Only Weather API
const weatherApiKey = '3923a1988dd69d0ffeb7716bad2e51ac';
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector("#preloader").style.display = "none";
    }, 1500)
});


async function checkWeather(city) {
    const response = await fetch(weatherURL + city + `&appid=${weatherApiKey}`);
    const data = await response.json();

    if (response.status === 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector(".weather").style.visibility = "hidden";
        appContainer.style.backgroundImage =
            `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("images/weather.jpg")`;
    } else {
        setTimeout(() => {
            updateData(data);
        }, 500)
    }
}

async function updateData(data) {


    document.querySelector("#city").textContent = data.name;
    document.querySelector("#temp").textContent = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent = data.main.humidity + '%';
    document.querySelector(".wind").textContent = data.wind.speed + "Km/h";


    const weatherCondition = data.weather[0].main;

    if (weatherCondition == 'Clear') {
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition == 'Clouds') {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition == 'Haze') {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition == 'Mist') {
        weatherIcon.src = "images/mist.png";
    } else if (weatherCondition == 'Rain') {
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition == 'Snow') {
        weatherIcon.src = "images/snow.png";
    }

    document.querySelector("#condition").textContent = data.weather[0].main;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = 'none';
}


checkWeather("kolkata");

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value.trim());
});

// Date determination

function showWeekDay(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];
  return weekDay;
}

function showDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  let fullDate = `${month} ${day} ${year}`;
  return fullDate;
}

let currentWeekDay = document.querySelector("#weekday");
currentWeekDay.innerHTML = showWeekDay(new Date());

let currentDate = document.querySelector("#date");
currentDate.innerHTML = showDate(new Date());

let currentTime = document.querySelector("#time");
currentTime.innerHTML = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

// forecast displaying

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col day-weather-forecast">
        <p class="forecast-day">${formatDay(forecastDay.dt)}</p>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="forecast-image"
          class="forecast-image"
          id="forecast-image"
        />
        <p class="forecast-temperature">
          <span id="max-temp">${Math.round(forecastDay.temp.max)}° </span
          ><span id="min-temp"> ${Math.round(forecastDay.temp.min)}°</span>
        </p>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bbaf82554bcf373d103d5f004dcf90e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Search location and temperature displaying

function displayWeather(response) {
  let currentTemp = document.querySelector("#degrees");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = response.data.weather[0].description;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentImage = document.querySelector("#weather-image");
  currentImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentImage.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchLocation(location) {
  let apiKey = "bbaf82554bcf373d103d5f004dcf90e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#search-line").value;
  searchLocation(location);
}

let searchForm = document.querySelector(".searching-form");
searchForm.addEventListener("submit", changeLocation);

// Current geolocation

function showCurrentLocation(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiKey = "bbaf82554bcf373d103d5f004dcf90e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrent);

searchLocation("Kyiv");

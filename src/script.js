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

/* 
//Location changing

function changeLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-line");
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = searchInput.value.toUpperCase();
}

let searchForm = document.querySelector(".searching-form");
searchForm.addEventListener("submit", changeLocation);

// Temperature unit changing

function temperatureToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  temp.innerHTML = 57;
}

function temperatureToCelsium(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  temp.innerHTML = 14;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", temperatureToFahrenheit);

let celsiumLink = document.querySelector("#celsium");
celsiumLink.addEventListener("click", temperatureToCelsium);
*/

// !!! Week 5 HW - Search Engine - https://codesandbox.io/s/week-5-hw-search-engine-gyzyeg?file=/index.html

// Search location and temperature displaying

function displayWeather(response) {
  let currentTemp = document.querySelector("#degrees");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.name;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = response.data.weather[0].main;
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

searchLocation("Kyiv");

// Current geolocation

function showCurrentLocation(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  console.log(currentLatitude);
  console.log(currentLongitude);
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

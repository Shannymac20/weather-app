function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  let dayindex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayindex];
  return `${day} ${hours}: ${minutes}`;
}
function displayTemperature(response) {
  document.querySelector("#cities").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "b01197a4540484dca162b351b33b73ea";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTemperature);
}
function handelSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function showLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#submit");
searchForm.addEventListener("click", handelSubmit);

let shareButton = document.querySelector("#current-location-button");
shareButton.addEventListener("click", getCurrentLocation);

searchCity("Georgia");

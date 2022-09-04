var currentTime = moment();

var superSecretAPIKey = "9c040bb6e1db52e48386cf880254ac09";

var liveCityCityEl = document.querySelector(".liveCity");
var liveCityDateEl = document.querySelector(".liveDate");
var liveCityTempEl = document.querySelector(".liveCityTemp");
var liveCityWindEl = document.querySelector(".liveCityWind");
var liveCityHumidityEl = document.querySelector(".liveCityHumidity");
var liveCityUVEl = document.querySelector(".liveCityUVindex");
var liveCityIconEl = document.querySelector(".liveCityIcon");

var forecastcard1CityDateEL = document.querySelector(".forecastCard1CityDate");
var forecastcard1TempEL = document.querySelector(".day1ForeTemp");
var forecastcard1WindEL = document.querySelector(".day1ForeWind");
var forecastcard1HumidityEL = document.querySelector(".day1ForeHumidity");
var forecastIcon1El = document.querySelector(".day1Icon");

var forecastcard2CityDateEL = document.querySelector(".forecastCard2CityDate");
var forecastcard2TempEL = document.querySelector(".day2ForeTemp");
var forecastcard2WindEL = document.querySelector(".day2ForeWind");
var forecastcard2HumidityEL = document.querySelector(".day2ForeHumidity");
var forecastIcon2El = document.querySelector(".day2Icon");

var forecastcard3CityDateEL = document.querySelector(".forecastCard3CityDate");
var forecastcard3TempEL = document.querySelector(".day3ForeTemp");
var forecastcard3WindEL = document.querySelector(".day3ForeWind");
var forecastcard3HumidityEL = document.querySelector(".day3ForeHumidity");
var forecastIcon3El = document.querySelector(".day3Icon");

var forecastcard4CityDateEL = document.querySelector(".forecastCard4CityDate");
var forecastcard4TempEL = document.querySelector(".day4ForeTemp");
var forecastcard4WindEL = document.querySelector(".day4ForeWind");
var forecastcard4HumidityEL = document.querySelector(".day4ForeHumidity");
var forecastIcon4El = document.querySelector(".day4Icon");

var forecastcard5CityDateEL = document.querySelector(".forecastCard5CityDate");
var forecastcard5TempEL = document.querySelector(".day5ForeTemp");
var forecastcard5WindEL = document.querySelector(".day5ForeWind");
var forecastcard5HumidityEL = document.querySelector(".day5ForeHumidity");
var forecastIcon5El = document.querySelector(".day5Icon");


var searchBoxInput = document.querySelector(".searchBoxInput");
var searchHistoryListEl = document.querySelector(".searchHistoryList");


var searchButton = document.querySelector(".searchBtn");

var cityButton1 = document.querySelector(".cityButton1");
var cityButton2 = document.querySelector(".cityButton2");
var cityButton3 = document.querySelector(".cityButton3");
var cityButton4 = document.querySelector(".cityButton4");
var cityButton5 = document.querySelector(".cityButton5");

var searchHistory = [];

var localHistory = JSON.parse(localStorage.getItem("wxSearchHistory"));


if (localHistory) {
  searchHistory = localHistory;
}


let currentCityWeather = {
  "city": "Austin",
  "state": "Texas",
  "date": "5-30-2022",
  "wxImgLink": "",
  "temp": "55",
  "wind": "55",
  "humidity": "84",
  "uvIndex": "7",

}

var fiveDayForecast = [
  {
    "date": "6-1-2022",
    "wxImgLink": "",
    "temp": "70",
    "wind": "15",
    "humidity": "34",
  },
  {
    "date": "6-2-2022",
    "wxImgLink": "",
    "temp": "70",
    "wind": "15",
    "humidity": "45",
  },
  {
    "date": "6-3-2022",
    "wxImgLink": "",
    "temp": "70",
    "wind": "15",
    "humidity": "45",
  },
  {
    "date": "6-4-2022",
    "wxImgLink": "",
    "temp": "70",
    "wind": "15",
    "humidity": "45",
  },
  {
    "date": "6-5-2022",
    "wxImgLink": "",
    "temp": "70",
    "wind": "15",
    "humidity": "45",
  }
]

searchButton.addEventListener("click", function (clickEvent) {

  if (searchBoxInput.value) {

    currentCityWeather.city = searchBoxInput.value;

    currentCityWeatherUpdate(searchBoxInput.value);

    searchHistory.unshift(searchBoxInput.value);

    localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));

    refreshPageData();

  }
  else {
    window.alert("Empty Search Input!");
  }



});

cityButton1.addEventListener("click", function (clickEvent) {


  currentCityWeather.city = searchHistory[0];
  currentCityWeatherUpdate(currentCityWeather.city);
  searchHistory.unshift(currentCityWeather.city);
  localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));
  refreshPageData();

});

cityButton2.addEventListener("click", function (clickEvent) {


  currentCityWeather.city = searchHistory[1];
  currentCityWeatherUpdate(currentCityWeather.city);
  searchHistory.unshift(currentCityWeather.city);
  localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));
  refreshPageData();

});

cityButton3.addEventListener("click", function (clickEvent) {


  currentCityWeather.city = searchHistory[2];
  currentCityWeatherUpdate(currentCityWeather.city);
  searchHistory.unshift(currentCityWeather.city);
  localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));
  refreshPageData();

});

cityButton4.addEventListener("click", function (clickEvent) {


  currentCityWeather.city = searchHistory[3];
  currentCityWeatherUpdate(currentCityWeather.city);
  searchHistory.unshift(currentCityWeather.city);
  localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));
  refreshPageData();

});

cityButton5.addEventListener("click", function (clickEvent) {


  currentCityWeather.city = searchHistory[4];
  currentCityWeatherUpdate(currentCityWeather.city);
  searchHistory.unshift(currentCityWeather.city);
  localStorage.setItem("wxSearchHistory", JSON.stringify(searchHistory));
  refreshPageData();

});

async function currentCityWeatherUpdate(searchCity) {

  var outputLATLON = new Array(3);
  var newCityWeather = {};

  outputLATLON = convertCitytoLATLON(searchCity);

  await delay(4000);

  var cityResults = cityWeatherFetch(outputLATLON);

}

function convertCitytoLATLON(city) {

  var outputArray = ["VOID", "VOID", "VOID"];

  var convertCityAPICall = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + superSecretAPIKey;


  fetch(convertCityAPICall)
    .then(function (response) {

      if (response.status === 200) {
      }
      else {
      }

      return response.json();

    })
    .then(function (data) {

      outputArray[0] = data[0].lat;
      outputArray[1] = data[0].lon;
      outputArray[2] = data[0].state;

      currentCityWeather.state = data[0].state;

      return outputArray

    });

  return outputArray
}

function cityWeatherFetch(location) {

  var lat = location[0];
  var lon = location[1];
  var apiCall = "VOID";

  let cityWeather = {
    "city": "VOID",
    "date": "VOID",
    "wxImgLink": "VOID",
    "temp": "VOID",
    "wind": "VOID",
    "humidity": "VOID",
    "uvIndex": "VOID",
  }

  apiCall = openWeatherAPICallGen(lat, lon, "current");

  openWeatherFetch(apiCall);

}


function openWeatherAPICallGen(lat, lon, exclude) {

  var finalAPIcall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + exclude + "&appid=" + superSecretAPIKey + "&units=imperial";

  return finalAPIcall;
}

function openWeatherFetch(apiURL) {

  var outputArray = new Array(6);
  var outputResponse;

  fetch(apiURL)
    .then(function (response) {


      if (response.status === 200) {
        outputResponse = 1;
      }
      else {
        outputResponse = 0;

      }

      return response.json();
    })
    .then(function (data) {

      outputArray[0] = data.hourly[0].dt;
      outputArray[1] = data.timezone_offset;
      outputArray[2] = data.hourly[0].temp;
      outputArray[3] = data.hourly[0].wind_speed;
      outputArray[4] = data.hourly[0].humidity;
      outputArray[5] = data.hourly[0].uvi;

      currentCityWeather.temp = data.hourly[0].temp;
      currentCityWeather.wind = data.hourly[0].wind_speed;
      currentCityWeather.humidity = data.hourly[0].humidity;
      currentCityWeather.uvIndex = data.hourly[0].uvi;
      currentCityWeather.date = moment(data.hourly[0].dt, "X").format("MMM Do YYYY");
      currentCityWeather.wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[0].weather[0].icon + "@2x.png";

      fiveDayForecast[0].date = moment(data.daily[1].dt, "X").format("MMM Do YYYY");
      fiveDayForecast[0].temp = data.daily[1].temp.day;
      fiveDayForecast[0].wind = data.daily[1].wind_speed;
      fiveDayForecast[0].humidity = data.daily[1].humidity;
      fiveDayForecast[0].wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[1].weather[0].icon + "@2x.png";

      fiveDayForecast[1].date = moment(data.daily[2].dt, "X").format("MMM Do YYYY");
      fiveDayForecast[1].temp = data.daily[2].temp.day;
      fiveDayForecast[1].wind = data.daily[2].wind_speed;
      fiveDayForecast[1].humidity = data.daily[2].humidity;
      fiveDayForecast[1].wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[2].weather[0].icon + "@2x.png";

      fiveDayForecast[2].date = moment(data.daily[3].dt, "X").format("MMM Do YYYY");
      fiveDayForecast[2].temp = data.daily[3].temp.day;
      fiveDayForecast[2].wind = data.daily[3].wind_speed;
      fiveDayForecast[2].humidity = data.daily[3].humidity;
      fiveDayForecast[2].wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[3].weather[0].icon + "@2x.png";

      fiveDayForecast[3].date = moment(data.daily[4].dt, "X").format("MMM Do YYYY");
      fiveDayForecast[3].temp = data.daily[4].temp.day;
      fiveDayForecast[3].wind = data.daily[4].wind_speed;
      fiveDayForecast[3].humidity = data.daily[4].humidity;
      fiveDayForecast[3].wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[4].weather[0].icon + "@2x.png";

      fiveDayForecast[4].date = moment(data.daily[5].dt, "X").format("MMM Do YYYY");
      fiveDayForecast[4].temp = data.daily[5].temp.day;
      fiveDayForecast[4].wind = data.daily[5].wind_speed;
      fiveDayForecast[4].humidity = data.daily[5].humidity;
      fiveDayForecast[4].wxImgLink = "https://openweathermap.org/img/wn/" + data.hourly[5].weather[0].icon + "@2x.png";

      refreshPageData();

    });

}

function refreshPageData() {

  liveCityCityEl.textContent = currentCityWeather.city + ", " + currentCityWeather.state;
  liveCityDateEl.textContent = currentCityWeather.date;
  liveCityTempEl.textContent = "Temperature: " + currentCityWeather.temp + " (F)";
  liveCityWindEl.textContent = "Wind: " + currentCityWeather.wind + " mph";
  liveCityHumidityEl.textContent = "Humidity: " + currentCityWeather.humidity + " %";
  liveCityUVEl.textContent = "UV Index: " + currentCityWeather.uvIndex;
  liveCityIconEl.src = currentCityWeather.wxImgLink;

  if (currentCityWeather.uvIndex < 3) {
    liveCityUVEl.style.color = "green";
  } else if (currentCityWeather.uvIndex < 6) {
    liveCityUVEl.style.color = "yellow";
  } else if (currentCityWeather.uvIndex < 8) {
    liveCityUVEl.style.color = "#fb5607";
  } else if (currentCityWeather.uvIndex < 11) {
    liveCityUVEl.style.color = "red";
  } else if (currentCityWeather.uvIndex > 11) {
    liveCityUVEl.style.color = "purple";
  }

  forecastcard1CityDateEL.textContent = fiveDayForecast[0].date;
  forecastcard1TempEL.textContent = "Temperature: " + fiveDayForecast[0].temp;
  forecastcard1WindEL.textContent = "Wind: " + fiveDayForecast[0].wind + " mph";
  forecastcard1HumidityEL.textContent = "Humidity: " + fiveDayForecast[0].humidity + " %";
  forecastIcon1El.src = fiveDayForecast[0].wxImgLink;

  forecastcard2CityDateEL.textContent = fiveDayForecast[1].date;
  forecastcard2TempEL.textContent = "Temperature: " + fiveDayForecast[1].temp;
  forecastcard2WindEL.textContent = "Wind: " + fiveDayForecast[1].wind + " mph";
  forecastcard2HumidityEL.textContent = "Humidity: " + fiveDayForecast[1].humidity + " %";
  forecastIcon2El.src = fiveDayForecast[1].wxImgLink;

  forecastcard3CityDateEL.textContent = fiveDayForecast[2].date;
  forecastcard3TempEL.textContent = "Temperature: " + fiveDayForecast[2].temp;
  forecastcard3WindEL.textContent = "Wind: " + fiveDayForecast[2].wind + " mph";
  forecastcard3HumidityEL.textContent = "Humidity: " + fiveDayForecast[2].humidity + " %";
  forecastIcon3El.src = fiveDayForecast[2].wxImgLink;

  forecastcard4CityDateEL.textContent = fiveDayForecast[3].date;
  forecastcard4TempEL.textContent = "Temperature: " + fiveDayForecast[3].temp;
  forecastcard4WindEL.textContent = "Wind: " + fiveDayForecast[3].wind + " mph";
  forecastcard4HumidityEL.textContent = "Humidity: " + fiveDayForecast[3].humidity + " %";
  forecastIcon4El.src = fiveDayForecast[3].wxImgLink;

  forecastcard5CityDateEL.textContent = fiveDayForecast[4].date;
  forecastcard5TempEL.textContent = "Temperature: " + fiveDayForecast[4].temp;
  forecastcard5WindEL.textContent = "Wind: " + fiveDayForecast[4].wind + " mph";
  forecastcard5HumidityEL.textContent = "Humidity: " + fiveDayForecast[4].humidity + " %";
  forecastIcon5El.src = fiveDayForecast[4].wxImgLink;

  cityButton1.textContent = searchHistory[0];
  cityButton2.textContent = searchHistory[1];
  cityButton3.textContent = searchHistory[2];
  cityButton4.textContent = searchHistory[3];
  cityButton5.textContent = searchHistory[4];

}

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function init() {

  refreshPageData();

}

init();
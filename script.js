"use strict";

// variables
const searchBox = document.getElementById("search");
const searchBtn = document.querySelector(".btn");
const weatherImg = document.querySelector(".Weather-img");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".Humidity");
const windSpeed = document.querySelector(".wind");
const errMsg = document.querySelector(".error");
const btnAgain = document.querySelector(".btn-again");
const danger = `<i class="fa-solid fa-triangle-exclamation" style="color: #cc0000;"></i>`;

// API : key / url
const apiKey = "56e04e2639af07883f06ddc00ffa76f8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const emptyWeatherApp = () => {
  searchBox.value = "";
  weatherImg.src = "";

  temp.textContent = "";
  humidity.textContent = "";
  windSpeed.textContent = "";
};

// async Function : >
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    const { name, wind, main, weather } = data;
    const weatherMain = weather[0].main;

    cityName.textContent = name;
    temp.textContent = `${Math.floor(main.temp)}°C`;
    humidity.textContent = `${main.humidity}%`;
    windSpeed.textContent = `${wind.speed} km/h`;

    if (weatherMain === "Clear") {
      weatherImg.src = "images/Clear.png";
    } else if (weatherMain === "Smoke") {
      weatherImg.src = "images/Smoke.png";
    } else if (weatherMain === "Clouds") {
      weatherImg.src = "images/Clouds.png";
    } else if (weatherMain === "Rain") {
      weatherImg.src = "images/Rain.png";
    } else if (weatherMain === "Snow") {
      weatherImg.src = "images/Snow.png";
    } else if (weatherMain === "Thunderstorm") {
      weatherImg.src = "images/Thunderstorm.png";
    } else if (weatherMain === "Haze") {
      weatherImg.src = "images/Haze.png";
    } else if (weatherMain === "Mist") {
      weatherImg.src = "images/Mist.png";
    }

    errMsg.style.display = "none";
  } catch (Error) {
    errMsg.style.display = "block";
    // Clear Weather App
    cityName.textContent = `${data.message} :(`;
    emptyWeatherApp();
    // Error on clg
    console.error(Error);
  }
}

// EventListeners : >
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

btnAgain.addEventListener("click", () => {
  const cityIcon = document.createElement("i");
  cityIcon.className = "fa-solid fa-city";
  cityName.textContent = `Enter City Name : `;
  cityName.append(cityIcon);

  errMsg.style.display = "none";
  emptyWeatherApp();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

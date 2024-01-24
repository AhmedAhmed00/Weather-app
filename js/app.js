let date = new Date();
let monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Spet",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let searchInput = document.querySelector(".search-input");
let today = document.querySelector(".item-today");
let nextDay = document.querySelectorAll(".next-day");

// get default data
getWether();

// get data after search
searchInput.addEventListener("keyup", search);

// fetch api
async function getWether(name = "London") {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b6fc9432d9c44de183434856230803&q=${name}&days=3 `
  );
  weatherData = await res.json();
  getTodayData(weatherData);
  getTheNextDay(weatherData);
}

// get Today data
function getTodayData(temp) {
  let html = `
                <div class="head d-flex justify-content-between px-3">
                  <p class="the-day pt-3">${days[date.getDay()]}</p>
                  <p class="the-date pt-3">${date.getDate()} ${
    monthName[date.getMonth()]
  }</p>
                </div>

                <div class="content p-3 text-white">
                  <div class="city fs-4 fw-bold my-3 px-3"> ${
                    temp.location.name
                  }</div>
                  <div
                    class="temperature d-flex justify-content-between align-items-center px-3"
                  >
                    <p class="temperature-deg fw-bold">${
                      temp.forecast.forecastday[0].day.maxtemp_c
                    }<sup>o</sup>C</p>
                    <img class="temperature-icon" width="90" src="https:${
                      temp.current.condition.icon
                    }" />
                  </div>
                  <span class="temperature-status d-block my-4 px-3"
                    >${temp.current.condition.text}</span
                  >
                  <div class="temperature-info d-flex px-3">
                    <div class="humidity d-flex align-items-baseline me-3">
                      <i class="fas fa-umbrella pe-1"></i>
                      <p class="humidity-deg">${
                        temp.forecast.forecastday[0].day.avghumidity
                      }%</p>
                    </div>
                    <div class="wind-speed d-flex align-items-baseline me-3">
                      <i class="fas fa-wind pe-1"></i>
                      <p class="wind-speed-deg">${temp.current.wind_kph}%</p>
                    </div>
                    <div class="direction d-flex align-items-baseline me-3">
                      <i class="far fa-compass pe-1"></i>
                      <p class="direction-deg">${temp.current.wind_dir}</p>
                    </div>
                  </div>
            </div>
`;
  today.innerHTML = html;
}

// get the next day data
function getTheNextDay(temp) {
  for (let i = 0; i < nextDay.length; i++) {
    let html = `
       <div class="head">
                  <p class="the-day pt-3">${days[checkNextDay() + i]}</p>
                </div>
                <div class="content p-4 text-white">
                  <div class="next-day-icon px-3">
                    <img class="temperature-icon" width="90"  src="https:${
                      temp.forecast.forecastday[i + 1].day.condition.icon
                    }"/>
                  </div>
                  <div class="temperature">
                    <p class="max-deg fs-3">${
                      temp.forecast.forecastday[i + 1].day.maxtemp_c
                    }</p>
                    <p class="min-deg mb-4">${
                      temp.forecast.forecastday[i + 1].day.mintemp_c
                    }</p>
                  </div>
                  <span
                    class="temperature-status d-inline-block mb-4 px-3"
                  >${temp.forecast.forecastday[i].day.condition.text}</span>
                </div>

    `;
    nextDay[i].innerHTML = html;
  }
}

// function to search by name of the city
function search() {
  getWether(searchInput.value);
  if (searchInput.value === "") {
    getWether();
  }
}

function checkNextDay() {
  if (date.getDay() === 6) {
    return 0;
  } else {
    return date.getDay();
  }
}

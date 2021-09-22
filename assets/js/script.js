let url = document.location.href;
let city;

if (url.split("?ville=")[1]) {
    city = url.split("?ville=")[1];
} else {
    city = "Paris";
}

fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=18510638b7f670070f0c8aff37d87f2b&units=metric&lang=fr")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        AfficheAPI(data);
    });


function AfficheAPI(data) {
    if (data.message == "city not found") {
        document.querySelector(".error_message").insertAdjacentHTML("beforeend",
            "<h2>La ville demandée n'a pas été trouvée.</h2>");
    } else {
        document.querySelector(".city").insertAdjacentHTML("beforeend", data.name);
        document.querySelector(".weather_title").insertAdjacentHTML("beforeend", data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1));
        document.querySelector(".weather_icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        document.querySelector(".feels_like").insertAdjacentText("beforeend", "Ressenti " + Math.round(data.main.feels_like) + " °C");
        document.querySelector(".wind").insertAdjacentText("afterbegin", (data.wind.speed * 3.6).toFixed(2) + " km/h");
        document.querySelector(".humidity").insertAdjacentText("afterbegin", data.main.humidity + " %");
        document.querySelector(".weather_temp").insertAdjacentText("afterbegin", Math.round(data.main.temp) + " °");
        document.querySelector(".weather_temp_min").insertAdjacentText("afterbegin", Math.round(data.main.temp_min) + " °C");
        document.querySelector(".weather_temp_max").insertAdjacentText("afterbegin", Math.round(data.main.temp_max) + " °C");
    }
}
//<h1>"+data.name+"</h1><img src='https://openweathermap.org/img/wn/"+data.weather[0].icon+".png' alt=''>

// Récupération de la ville dans l'URL
let url = document.location.href;
let city;

// Test pour savoir s'il y a une ville dans l'URL
if (url.split("?ville=")[1]) {
    city = url.split("?ville=")[1];
} else {
    // Ville par défaut
    city = "Paris";
}

// Appel de l'API
fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=18510638b7f670070f0c8aff37d87f2b&units=metric&lang=fr")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Appel de la fonction d'affichage des données
        AfficheAPI(data);
    });

// Fonction d'affichage des données
function AfficheAPI(data) {
    // Test pour savoir si la ville renseignée existe bien
    if (data.message == "city not found") {
        let error = document.querySelector(".error_message")
        error.insertAdjacentHTML("beforeend", 
        "La ville demandée n'a pas été trouvée.");
        error.classList.add("error_affiche");
        document.querySelector(".weather_details").classList.add("error_city");
    }
    else {        
        // Affichage du nom de la ville
        document.querySelector(".city").insertAdjacentHTML("beforeend", data.name);
        // Affichage de la description du temps
        document.querySelector(".weather_title").insertAdjacentHTML("beforeend", data.weather[0].description[0].toUpperCase()+data.weather[0].description.slice(1));
        // Affichage de l'icône de la météo
        document.querySelector(".weather_icon").setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
        // Affichage du ressenti
        document.querySelector(".feels_like").insertAdjacentText("beforeend", "Ressenti "+Math.round(data.main.feels_like)+" °C");
        // Affichage de la vitesse du vent
        document.querySelector(".wind").insertAdjacentText("afterbegin", (data.wind.speed*3.6).toFixed(2)+" km/h");
        // Affichage du pourcentage d'humidité
        document.querySelector(".humidity").insertAdjacentText("afterbegin", data.main.humidity+" %");
        // Affichage de la température
        document.querySelector(".weather_temp").insertAdjacentText("afterbegin", Math.round(data.main.temp)+" °");
        // Affichage de la température minimale
        document.querySelector(".weather_temp_min").insertAdjacentText("afterbegin", Math.round(data.main.temp_min)+" °C");
        // Affichage de la température maximale
        document.querySelector(".weather_temp_max").insertAdjacentText("afterbegin", Math.round(data.main.temp_max)+" °C");
        // Affichage de la date
        let date = new Date();
        let options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
        document.querySelector("header").insertAdjacentText("afterbegin", date.toLocaleDateString("fr-FR", options));
    }
}
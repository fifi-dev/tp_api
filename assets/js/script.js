let city = "Paris";
let url = document.location.href;
console.log(url.split("?ville="));

fetch("http://api.openweathermap.org/data/2.5/weather?q="+url.split("?ville=")[1]+"&appid=18510638b7f670070f0c8aff37d87f2b&units=metric&lang=fr")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        let div = document.querySelector(".meteo");
        if (data.message == "city not found") {
            div.insertAdjacentHTML("beforeend", 
            "<h2>La ville demandée n'a pas été trouvée</h2>");
        }
        else {        
            div.insertAdjacentHTML("beforeend", 
            "<h1>"+data.name+"</h1><img src='https://openweathermap.org/img/wn/"+data.weather[0].icon+".png' alt=''>");
        }


    })
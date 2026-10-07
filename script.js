
let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weatherResult = document.getElementById("weatherResult");


searchButton.addEventListener("click",function(){

    let city = cityInput.value;

    if(city.trim() === ""){
return;
    }


fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)

.then (function(response) {
    return response.json();
})
    
.then(function(data) {
    
    if(!data.results){
weatherResult.textContent = "City not found";
return;
    }

let latitude = data.results[0].latitude;
let longitude = data.results[0].longitude;

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)

.then(function(response){
return response.json();
})

.then(function(data){

let weatherCode =data.current.weather_code;
let weatherDescription;

if(weatherCode === 0){
weatherDescription  = "Clear sky ☀️";

}else if(weatherCode === 1 ){
weatherDescription  = "Mainly clear";

}else if(weatherCode === 2){
weatherDescription  = "Partly cloudy";

}else if(weatherCode === 3){
weatherDescription  = "Overcast";

}else {
weatherDescription = "Unknown weather";
}




weatherResult.innerHTML = `
<h2>${city}</h2>
<p>Temperature: ${data.current.temperature_2m}°C</p>
<p> ${weatherDescription}</p>

`;        

})


})


});

cityInput.addEventListener("keydown",function(event){

if(event.key === "Enter"){
searchButton.click();
}

});
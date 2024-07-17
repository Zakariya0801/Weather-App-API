var weatherApi = "/weather"

const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const weatherIcon = document.querySelector(".icon img")
const temperature = document.querySelector(".temperature")
const weatherCondition = document.querySelector(".weathercond")

const tempElement = document.querySelector(".temperature span")

const locationElement = document.querySelector(".place") 
const dateElement = document.querySelector(".date") 

const currentDate = new Date();
const monthName = currentDate.toLocaleString("en-US",{month:"long"});
dateElement.textContent = currentDate.getDate() + ", " + monthName;
weatherform.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log(search.value);
    locationElement.textContent = "Loading...";
    weatherIcon.src = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    showData(search.value);
});

function showData(city){
    getWeatherData(city, (result) =>{
        if(result.cod == 200){
            //weather icon load
            if(result.weather[0].description == "cloudy" || result.weather[0].description == "fog" || result.weather[0].description == "smoke")
                weatherIcon.src = "./images/weather-cloudy.png";
            else if(result.weather[0].description == "rain")
                weatherIcon.src = "./images/weather-rainy.png";
            else
                weatherIcon.src = "./images/weather-sunny.png";
            console.log(weatherIcon.src);
            locationElement.textContent = result?.name;
            tempElement.textContent = (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();
        }
        else{
            locationElement.textContent = "City Not Found";
        }
    })
}

function getWeatherData(city,callback){ 
    fetch(weatherApi + "?address=" + city).then((response) =>{
        response.json().then((response)=>{
            callback(response);
        })
    })
}
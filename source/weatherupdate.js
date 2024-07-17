const request = require("request");

const weather = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    KEY: "30568bb4edafb430d1a9cb1509227f65"
}

const weatherData = (address,callbackfunc) => {
    const url = weather.BASE_URL + encodeURIComponent(address) + "&appid=" + weather.KEY;
    console.log(url);
    request({url,json:true}, (error, data) => {
        if(error)
            callbackfunc(true,"Unable to fetch the address data")
        // console.log(data?.body);
        callbackfunc(false,data?.body);
    })
}

module.exports = weatherData;
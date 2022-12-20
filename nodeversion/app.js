const express = require('express');
const https = require("https");
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.post('/weather', function(req, res){
  const cname = req.body.message;
  return res.status(200).json({message:"Successfully"});
  
})

app.get("/weather",function(req,res){


  const cname = req.query.search;

  const apiKey = ''; //Enter your app id from openweathermap
  const unit = "metric";
  const lang = "en";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=london&units=" + unit + "&lang=" + lang + "&appid=" + apiKey;
  const urls = `https://api.openweathermap.org/data/2.5/weather?q=${cname}&units=${unit}&lang${lang}&appid=${apiKey}`;

  https.get(url,function(response){

    response.on("data",function(data){
    const weatherData = JSON.parse(data);

    const name = weatherData.name;
    const temp = weatherData.main.temp;
    const feel = weatherData.main.feels_like;
    const tmin = weatherData.main.temp_min;
    const tmax = weatherData.main.temp_max;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const desc = weatherData.weather[0].description; //weather is an array
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@4x.png"; 
    const country = weatherData.sys.country;
    const timezone = weatherData.timezone;
    const wspeed = weatherData.wind.speed;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    const result = {
      name : name,
      temp: temp,
      feel: feel,
      tmin: tmin,
      tmax: tmax,
      desc: desc,
      icon: icon,
      imageURL: imageURL,
      humidity: humidity,
      pressure: pressure,
      country: country,
      timezone: timezone,
      wspeed: wspeed,
      sunrise: sunrise,
      sunset: sunset
    }
    res.send(result)
    res.end();
    });
  });
});


app.listen(5000, function(){
    console.log("server started at 5000");
})
'use strict';
const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast =require('../models/weather.model');
require('dotenv').config();

const Cache = require("../helper/cache.helper");
let cacheObject = new Cache();

const getweathers= async (request, res) => {
    const city = request.query.city;
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${WEATHER_API_KEY}`
    //  lat=${lat}&key=${WEATHER_API_KEY}&lon=${lon}
    const shuTime = 12000;
    const Minute = (Date.now() - cacheObject.timeStamp) > shuTime;
    if (Minute) {
     
      cacheObject = new Cache();
    }
    const weatherBitResponse = await axios.get(`${weatherUrl}`);
    //  response.json(weatherBitResponse.data);

    if (city) {
        let newArray = weatherBitResponse.data.data.map(item => {
            return new Forecast(item.datetime, item.weather.description)
        })
        if (newArray.length)
            console.log(newArray);
        res.json(newArray)
    } else {
        res.json('no data ')
    }
}

cacheObject.forCast.push({
    city_name: city_name,
    data: data,
  });
// const getHello =
//     function (req, res) { // callback function of what we should do with our request
//         res.send('nice') // our endpoint function response
//     }
module.exports = getWeather;


'use strict';
const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast =require('../models/weather.model');
require('dotenv').config();

const getWeather = async (request, res) => {
    const city = request.query.city;
    try{
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${WEATHER_API_KEY}`
    //  lat=${lat}&key=${WEATHER_API_KEY}&lon=${lon}

    
    //  response.json(weatherBitResponse.data);

    if (city) {
        const weatherBitResponse = await axios.get(weatherUrl);
        let newArray = weatherBitResponse.data.data.map(item => {
            return new Forecast(item.datetime, item.weather.description)
        });
        // if (newArray.length)
        //     console.log(newArray);
        res.json(newArray)
    } else {
        res.send('no data ')
    }} catch(err) {
        console.log("Something went wrong!");

    }
 }
// const getHello =
//     function (req, res) { // callback function of what we should do with our request
//         res.send('nice') // our endpoint function response
//     }
module.exports = getWeather;


const express = require('express') // require the express package
const app = express() // initialize your express app instance
const axios = require("axios");
const cors = require('cors');
app.use(cors()) 
 
require('dotenv').config();

const PORT=process.env.PORT
const weather=require('./data/weather.json');
const { response } = require('express');
// a server endpoint 
app.get('/hello', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('nice') // our endpoint function response
})


class Forecast {
  constructor(date,description){
  this.date=date
  this.description=description


}}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/weathers',  async (request,res)=>{ 
  const  city = request.query.city;
 const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${WEATHER_API_KEY}`
//  lat=${lat}&key=${WEATHER_API_KEY}&lon=${lon}

 const weatherBitResponse = await axios.get(`${weatherUrl}`);
//  response.json(weatherBitResponse.data);

 if (city){
    let newArray= weatherBitResponse.data.data.map(item=>{
      return new Forecast(item.datetime,item.weather.description)
    })
    if (newArray.length) 
    console.log(newArray);
    res.json(newArray)
    }else {
     res.json('no data ')
    }
  
// const checkArray=weather.find(item=>{
// return item.city_name.toLowerCase()===city.toLowerCase()

// })




}

)


app.listen(PORT)
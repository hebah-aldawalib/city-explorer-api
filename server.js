'use strict';

const express = require('express')
const app = express()

const cors = require('cors');
const axios = require('axios');
app.use(cors())
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT;

const weather = require('./data/weather.json')
// a server endpoint 
app.get('/hello', // our endpoint name
    (req, res) => { // callback function of what we should do with our request
        res.send('nice') // our endpoint function response
    })

app.get('/weather', async (req, res) => {
    // console.log(req.query.high_temp);
    let city_name = req.query.city_name;
    const lon = req.query.lon;
    const lot = req.query.lot;
    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    // https://api.weatherbit.io/v2.0/forecast/daily?lat=31.95&lon=35.91&key=eaba3e0de8d042bbb3686f40c4274979
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lot}&lon=${lon}&key=${WEATHER_API_KEY}`);
console.log(weatherBitResponse.data.data[0].datetime);
console.log(weatherBitResponse.data.data[0].weather.description);
    res.json(weatherBitResponse.data);

    let name=weatherBitResponse.data.data[0].datetime; 
    const obj1 =new Forecast(name, weatherBitResponse.data.data[0].weather.description);
    
console.log(obj1);




    




//     let lon = req.query.lon;
//    let lot = req.query.lot;
// const searchQuery = reg.query.searchQuery;
// const returnArray = weather.find((item) => {


    // return (item.city_name.toLowerCase() === city_name.toLowerCase())
});


// if (returnArray) {
//     // let arrayOfReturn= returnArray.data;
//     let newArr = returnArray.data.map((item) => {
//         return new Forecast(item.datetime, item.weather.description);
//     })
//     res.json(newArr);
// }
// else {
//     res.json('data not found')
// }



// try {
//     if (lon || lot || searchQuery) {
//         const returnArray = weather.filter((item) => {
//             return [item.lon === lon || item.lot === lot || item.find(element => searchQuery === element)]
//         });

//         if (returnArray.length) {
//             res.json(returnArray);
//         } else {
//             res.send('no data found ')
//         }
//     } else {
//         res.json(weather);
//     }
// }
// catch (error) {
//     console.log("catch error" + error);
//     handleErrors(res);
// }
// }

// )


// app.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`);

// });


class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;

        
    }
}

function handleErrors(response) {
    response.status(500).send('Something went wrong.');
}


const checkArray=weather.find(item=>{
    return item.city_name.toLowerCase()===city.toLowerCase()
    
    })
    
    if (checkArray){
    let newArray=checkArray.data.map(item=>{
      return new Forecast(item.datetime,item.weather.description)
    })
    res.json(newArray)
    }else {
     res.json('no data ')
    }

app.listen(3001, () => {
    console.log(`Server started on port`);
});



// localhost:3001/weather?lot=31.95&lon=35.91
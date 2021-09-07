'use strict';

const express = require('express')
const app = express()

const cors = require('cors');
app.use(cors())
require('dotenv').config();

const PORT=process.env.PORT;

const weather = require('./data/weather.json')
// a server endpoint 
app.get('/hello', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('nice') // our endpoint function response
    })

app.get('/weather', (req, res) => {
    // console.log(req.query.high_temp);
    let city_name=req.query.city_name;
    // const lon = req.query.lon;
    // const lot = req.query.lot;
    let lon = req.query.lon;
   let lot = req.query.lot;
    const searchQuery = reg.query.searchQuery;


    const returnArray = weather.find((item) => {

        return (item.city_name.toLowerCase() === city_name.toLowerCase()) 
    });
    if (returnArray){
        // let arrayOfReturn= returnArray.data;
        let newArr = returnArray.data.map((item) => {
            return new Forecast(item.datetime, item.weather.description);
        })
        res.json(newArr);
    }
    else{
        res.json('data not found')
    }    

    

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


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);

});


class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
function handleErrors(response) {
    response.status(500).send('Something went wrong.');
}
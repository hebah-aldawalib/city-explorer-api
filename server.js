const express = require('express') // require the express package
const app = express() // initialize your express app instance
const axios = require("axios");
const cors = require('cors');
app.use(cors())

require('dotenv').config();

const PORT = process.env.PORT
const weather = require('./data/weather.json');
const { response } = require('express');
// a server endpoint 
app.get('/hello', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('nice') // our endpoint function response
    })


class Forecast {
    constructor(date, description) {
        this.date = date
        this.description = description


    }
}
class Moovies {
    constructor(title, overview, vote, count, img, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.vote = vote;
        this.count = count;
        this.img = img;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}

app.get("/", function (request, response) {
    response.send(
        "Hello ♥️   "
    );
});
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/weathers', async (request, res) => {
    const city = request.query.city;
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${WEATHER_API_KEY}`
    //  lat=${lat}&key=${WEATHER_API_KEY}&lon=${lon}

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
})

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
app.get("/movies", async (request, response) => {

    const city_name = request.query.query;
    // console.log(movieResponse);

    const movie = `https://api.themoviedb.org/3/movie/550?api_key=${MOVIES_API_KEY}`;
    const movieResponse = await axios.get(
        `${movie}?query=${city_name}&api_key=${process.env.MOVIES_API_KEY}`
    );

    if (city_name) {

        let moviData = movieResponse.data.results.map((data1) => {
            console.log(data1);
            return new Moovies(
                `Title: ${data1.title}`,
                `Overview: ${data1.overview}`,
                `Average votes: ${data1.vote_average}`,
                ` Total Votes: ${data1.vote_count}`,
                `${data1.poster_path}`,
                `popularity:${data1.popularity}`,
                `release_date:${data1.release_date}`

            );
        })
        if (moviData.length) {
            response.json(moviData);
        }
        else {
            response.send("error: Something went wrong.");
        }
        
    }
});


app.listen(PORT)
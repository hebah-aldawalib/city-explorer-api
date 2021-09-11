'use strict';
const axios = require("axios");
require('dotenv').config();
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
const Moovies =require('../models/movie.model');
const Cache = require("../helper/cache.helper");
let cacheObject = new Cache();

const getMovies= async (request, response) => {

    const city_name = request.query.query;

    const shuTime =12000;
    const tenSeconds = (Date.now() - cacheObject.timeStamp) > shuTime;
    if (tenSeconds) {
     
      cacheObject = new Cache();
    }
  
  

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


        cacheObject.movies.push({
            city_name: city_name,
            data: data,
          });
        if (moviData.length) {
            response.json(moviData);
        }
        else {
            response.send("error: Something went wrong.");
        }
        
    }
};

module.exports=getMovies;
const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
require('dotenv').config();
const cors = require("cors");
const getWeather = require("./controller/weather.controller");
const getMovies = require("./controller/movi.controller");
app.use(cors());

const PORT = process.env.PORT;
const weather = require("./data/weather.json");
const { response } = require("express");
const { getIndex, getHello } = require("./controller/index.controller");

app.get("/", getIndex);
app.get("/ getHello", getHello);

app.get("/weather", getWeather);

app.get("/movies", getMovies);

app.listen(PORT,()=>{
  console.log("Server is running on port 3030.");
});

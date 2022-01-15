const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//Define paths for express config
const publicDirectoryPaths = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engines and view location
app.set("view engine", "hbs");
app.set("views", viewsPath); //to set the custom path for hbs templates or views
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPaths));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Siddhant Agarwal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Siddhant Agarwal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Siddhant Agarwal",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
    if(error){
     return res.send({
        error: error,
      });
    }
   
  forecast(latitude,longitude, (error, forecastData) => {
      if(error){
          return  res.send({
            error: error,
          });
      }
       res.send({forecast:forecastData,location,address:req.query.address})
  });
});
//   res.send({
//     forecast: "It is snowing",
//     location: "Philadalphia",
//     address: req.query.address,
//   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({ products: [] });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessage: "Help article not found",
    name: "Siddhant Agarwal",
    title: "404",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    errorMessage: "Page Not found",
    name: "Siddhant Agarwal",
    title: "404",
  });
});
app.listen(4000, () => {
  console.log("Server is up on port 4000.");
});

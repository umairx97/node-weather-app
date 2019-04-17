const request = require("request");
const chalk = require("chalk");
const city = process.argv[2];
const ip = require("ip");
const publicIp = require("public-ip");
const axios = require("axios");

// const oldKey = 'san4GqjWsND0tGapYRWyB1knt8XtgkgP'
// const newKey = "IkctBCdqSDrUh33Pz0eOwfhxBTknTaAV"

// Returns 4 news from the country name given
const getNews = countryId => {
  const url = `https://newsapi.org/v2/everything?q=${countryId}?&apiKey=c0a3992f469a42e1a0533456c6dd4919`;
  request(url, (error, response, body) => {
    const info = JSON.parse(body);

    console.log("\t \t \t " + chalk.cyan.bold("News for " + countryId));
    for (let i = 0; i <= 4; i++) {
      console.log(chalk.cyan("Author: "), info.articles[i].author);
      console.log(chalk.yellow("Title: "), info.articles[i].title);
      console.log("\n");
    }
  });
};

// Returns the country name and province based on city key provided
const getCountry = cityKey => {
  const url = `http://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP`;
  request(url, (err, res, body) => {
    const info = JSON.parse(body);
    console.log("\t \t \t " + chalk.cyan.bold("Region:"));
    console.log(chalk.yellow("Country Name: "), info.Country.LocalizedName);
    console.log(
      chalk.yellow("Province Name: "),
      info.AdministrativeArea.LocalizedName
    );
    // Passing the country name to get the news
    getNews(info.Country.LocalizedName);
  });
};

// Returns the weather against a city key
const getWeather = cityKey => {
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP&metric=true`;

  request(url, (error, response, body) => {
    const info = JSON.parse(body);
    const forecast = info.DailyForecasts;

    console.log("\t \t \t " + chalk.cyan.bold("Weather:"));
    forecast.map(item =>
      console.log(
        "Minimum: " +
          item.Temperature.Minimum.Value +
          item.Temperature.Minimum.Unit
      )
    );
    forecast.map(item =>
      console.log(
        "Maximum: " +
          item.Temperature.Maximum.Value +
          item.Temperature.Maximum.Unit
      )
    );
  });
};

// Returns a key for a specific city to get the country
getData = city => {
  if (!city) {
    console.log(chalk.bgRed("Finding Information by location"));
    axios.get("https://ipapi.co/json").then(res => {
      const a = res.data.city;
      getData(a);
    });
    
  } else {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP&q=${city}`;
    request(url, (error, response, body) => {
      const data = JSON.parse(body);
      for (let i = 0; i < data.length; i++) {
        getCountry(data[i].Key);
        getWeather(data[i].Key);
        break;
      }
    });
  }
};

getData(city);

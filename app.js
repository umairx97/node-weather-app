const request = require("request");
const chalk = require("chalk");
const city = process.argv[2];

// Returns 4 news from the country name given
const getNews = countryId => {
  const url = `https://newsapi.org/v2/everything?q=${countryId}?&apiKey=c0a3992f469a42e1a0533456c6dd4919`;
  request(web, (error, response, body) => {
    const info = JSON.parse(body);
    for (let i = 0; i <= 3; i++) {
      console.log(chalk.red("Author: "), info.articles[i].author);
      console.log(chalk.green("Title: "), info.articles[i].title);
      console.log("\n");
    }
  });
};

// Returns the country name and province based on city key provided
const getCountry = cityKey => {
  const url = `http://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP`;
  request(url, (err, res, body) => {
    const info = JSON.parse(body);
    console.log(chalk.green("Country Name: "), info.Country.LocalizedName);
    console.log(chalk.green("Province Name: "), info.Province.LocalizedName);
    // Passing the country name to get the news
    getNews(info.Country.LocalizedName);
  });
};

// Returns a key for a specific city to get the country
getCity = city => {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP&q=${city}`;
  request(url, (error, response, body) => {
    console.log(response);
    const data = JSON.parse(body);
    for (let i = 0; i < data.length; i++) {
      getCountry(data[i].Key);
      break;
    }
  });
};

// getCity(city);

getNews("india");

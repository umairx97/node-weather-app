const request = require("request");
const chalk = require("chalk");

const getWeather = country => {};

const getNews = country => {
  const url = `https://newsapi.org/v2/top-headlines?pagesize=10&country=${country}&apiKey=c0a3992f469a42e1a0533456c6dd4919`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      console.log("\t\t\t\t" + chalk.inverse.red.bold(`News for ${country}`));
      for (let i = 0; i < info.articles.length; i++) {
        console.log(
          i +
            1 +
            " " +
            chalk.green("Title: " + "\n \t") +
            info.articles[i].title +
            "\n"
        );
      }
    }
  });
};

const getRegion = country => {
  console.log("Showing location");
};
module.exports = {
  getWeather,
  getNews,
  getRegion
};

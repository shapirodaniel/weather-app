const axios = require("axios");
process.env.NODE_ENV !== "production" && require("dotenv").config();

module.exports = async function (context, req) {
  try {
    const { cityName } = req.body;

    const uri = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    const { data: fetchedGeolocation } = await axios.get(uri);

    context.res.json(fetchedGeolocation);
  } catch (err) {
    console.error(err);
  }
};

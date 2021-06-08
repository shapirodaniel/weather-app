const axios = require('axios');

module.exports = async function (context, req) {
	try {
		const { latitude, longitude } = req.body;

		const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

		const { data: fetchedWeather } = await axios.get(uri);

		context.res.json(fetchedWeather);
	} catch (err) {
		console.error(err);
	}
};

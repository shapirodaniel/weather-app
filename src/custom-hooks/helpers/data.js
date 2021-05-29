// utility fn generates an src for the weather icon
const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const imperialToMetric = num => Math.round(((num - 32) * 5) / 9);

export const parseWeather = (weather, isImperial) => ({
	base: weather.base, // string
	cloudiness: Math.round(weather.clouds.all * 100) + '%', // string
	location: {
		lat: weather.coord.lat, // decimal
		lon: weather.coord.lon, // decimal
	},
	lastUpdate: weather.dt, // num long
	temp: isImperial
		? Math.round(weather.main.temp) // decimal
		: imperialToMetric(Math.round(weather.main.temp)),
	feelsLike: isImperial
		? Math.round(weather.main.feels_like) // decimal
		: imperialToMetric(Math.round(weather.main.feels_like)),
	humidity: isImperial
		? Math.round(weather.main.humidity) // int
		: imperialToMetric(Math.round(weather.main.humidity)),
	pressure: isImperial
		? Math.round(weather.main.pressure) // int
		: imperialToMetric(Math.round(weather.main.pressure)),
	maxTemp: weather.main.temp_max, // decimal
	minTemp: weather.main.temp_min, // decimal
	city: weather.name, // string
	country: weather.sys.country, // string
	sunrise: weather.sys.sunrise, // milliseconds long num UTC
	sunset: weather.sys.sunset, // milliseconds long num UTC
	timezone: weather.timezone, // shift in seconds from UTC
	windSpeed: weather.wind.speed, // mph imperial, m/s metric
	windDirection: weather.wind.deg, // in degrees (meteorological)
	windGust: weather.wind.gust, // mph imperial, m/s metric
	visibility: weather.visibility, // miles

	// the first entry in the weather conditions array
	description: weather[0].description, // string
	iconSrc: getWeatherIcon(weather[0].icon), // icon string src
	id: weather[0].id, // int
	name: weather[0].main, // string
});

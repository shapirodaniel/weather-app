// utility fn generates an src for the weather icon
const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const imperialToMetric = num => Math.round(((num - 32) * 5) / 9);

export const parseWeather = (fetchedWeather, isImperial) => {
	if (!fetchedWeather || !isImperial) return;

	return {
		base: fetchedWeather.base, // string
		cloudiness: Math.round(fetchedWeather.clouds.all * 100) + '%', // string
		location: {
			lat: fetchedWeather.coord.lat, // decimal
			lon: fetchedWeather.coord.lon, // decimal
		},
		lastUpdate: fetchedWeather.dt, // num long
		temp: isImperial
			? Math.round(fetchedWeather.main.temp) // decimal
			: imperialToMetric(Math.round(fetchedWeather.main.temp)),
		feelsLike: isImperial
			? Math.round(fetchedWeather.main.feels_like) // decimal
			: imperialToMetric(Math.round(fetchedWeather.main.feels_like)),
		humidity: isImperial
			? Math.round(fetchedWeather.main.humidity) // int
			: imperialToMetric(Math.round(fetchedWeather.main.humidity)),
		pressure: isImperial
			? Math.round(fetchedWeather.main.pressure) // int
			: imperialToMetric(Math.round(fetchedWeather.main.pressure)),
		maxTemp: isImperial
			? Math.round(fetchedWeather.main.temp_max)
			: imperialToMetric(Math.round(fetchedWeather.main.temp_max)), // decimal
		minTemp: isImperial
			? Math.round(fetchedWeather.main.temp_min)
			: imperialToMetric(Math.round(fetchedWeather.main.temp_min)), // decimal
		cityName: fetchedWeather.name, // string
		country: fetchedWeather.sys.country, // string
		sunrise: fetchedWeather.sys.sunrise, // milliseconds long num UTC
		sunset: fetchedWeather.sys.sunset, // milliseconds long num UTC
		timezone: fetchedWeather.timezone, // shift in seconds from UTC
		windSpeed: fetchedWeather.wind.speed, // mph imperial, m/s metric
		windDirection: fetchedWeather.wind.deg, // in degrees (meteorological)
		windGust: fetchedWeather.wind.gust, // mph imperial, m/s metric
		visibility: fetchedWeather.visibility, // miles

		description: fetchedWeather.weather[0].description /* ) || '' */, // string
		iconSrc: getWeatherIcon(fetchedWeather.weather[0].icon), // icon string src
		id: fetchedWeather.weather[0].id /* ) || 0*/, // int
		name: fetchedWeather.weather[0].main /* ) || '' */, // string
	};
};

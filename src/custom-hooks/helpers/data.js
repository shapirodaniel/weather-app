// utility fn generates an src for the weather icon
const getWeatherIcon = (iconString, isImperial) =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

export const getImperial = val => Math.round(((val - 273.15) * 9) / 5 + 32);

export const getMetric = val => Math.round(val - 273.15);

export const parseWeather = fetchedWeather => {
	if (!fetchedWeather) return;

	return {
		base: fetchedWeather.base, // string
		cloudiness: Math.round(fetchedWeather.clouds.all * 100) + '%', // string
		location: {
			lat: fetchedWeather.coord.lat, // decimal
			lon: fetchedWeather.coord.lon, // decimal
		},
		lastUpdate: fetchedWeather.dt, // num long

		temp: Math.round(fetchedWeather.main.temp), // decimal
		feelsLike: Math.round(fetchedWeather.main.feels_like), // decimal
		humidity: Math.round(fetchedWeather.main.humidity), // int
		pressure: Math.round(fetchedWeather.main.pressure), // int
		maxTemp: Math.round(fetchedWeather.main.temp_max), // int
		minTemp: Math.round(fetchedWeather.main.temp_min), // int

		cityName: fetchedWeather.name, // string
		country: fetchedWeather.sys.country, // string
		sunrise: fetchedWeather.sys.sunrise, // milliseconds long num UTC
		sunset: fetchedWeather.sys.sunset, // milliseconds long num UTC
		timezone: fetchedWeather.timezone, // shift in seconds from UTC
		windSpeed: fetchedWeather.wind.speed, // mph imperial, m/s metric
		windDirection: fetchedWeather.wind.deg, // in degrees (meteorological)
		windGust: fetchedWeather.wind.gust, // mph imperial, m/s metric
		visibility: fetchedWeather.visibility, // miles

		// the weather object on fetched data's contents
		description: fetchedWeather.weather[0].description, // string
		iconSrc: getWeatherIcon(fetchedWeather.weather[0].icon), // string
		id: fetchedWeather.weather[0].id, // int
		name: fetchedWeather.weather[0].main, // string
	};
};

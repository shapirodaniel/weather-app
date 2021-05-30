import { DateTime as dt } from 'luxon';
import { oneCallResponse as fetchedWeather } from '../../../openWeatherOneCallResponse';

// utility fn generates an src for the weather icon
const getWeatherIcon = icon =>
	`http://openweathermap.org/img/wn/${icon}@2x.png`;

// utility fn gets wind direction string from degrees, ex 300 deg -> 'W/NW'
const getWindDirectionFromDeg = deg => {
	// simplify to int
	deg = Math.round(deg / 10);

	switch (true) {
		case deg === 1 || deg >= 35:
			return 'N';
		case deg <= 3:
			return 'N/NE';
		case deg <= 5:
			return 'NE';
		case deg <= 7:
			return 'E/NE';
		case deg <= 10:
			return 'E';
		case deg <= 12:
			return 'E/SE';
		case deg <= 14:
			return 'SE';
		case deg <= 16:
			return 'S/SE';
		case deg <= 19:
			return 'S';
		case deg <= 21:
			return 'S/SW';
		case deg <= 23:
			return 'SW';
		case deg <= 25:
			return 'W/SW';
		case deg <= 28:
			return 'W';
		case deg <= 30:
			return 'W/NW';
		case deg <= 32:
			return 'NW';
		case deg <= 34:
			return 'N/NW';
		default:
			return '';
	}
};

// convert incoming data in kelvin to fahrenheit/celsius
export const getImperialTemp = val => Math.round(((val - 273.15) * 9) / 5 + 32);
export const getMetricTemp = val => Math.round(val - 273.15);

// convert visibility from meters to miles
export const getImperialVisibility = val =>
	Number((val * 0.000621371).toFixed(2));

// get weather location data
export const parseWeatherLocation = fetchedWeather => {
	if (!fetchedWeather) return;

	return {
		// geographical coordinates and time zone
		geoLocation: {
			latitude: fetchedWeather.lat, // decimal
			longitude: fetchedWeather.lon, // decimal
		},
		// timezone provided by api is a string, ex: 'Country/City'
		cityName: fetchedWeather.timezone.split('/')[1],
		countryName: fetchedWeather.timezone.split('/')[0],
		timeZoneOffset: fetchedWeather.timezone_offset, // int
	};
};

// get current weather

/* we're using Luxon, from one of the maintainers of Moment.js (now legacy), to do dateTime handling for us -- dt is the (aliased) luxon constructor DateTime, we're using .fromMillis() to convert unix UTC epoch timestamps provided by open weather and luxon's preset constants like dt.TIME_SIMPLE for generating different dateTime formats -- see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html for more details */

export const parseCurrentWeather = fetchedWeather => {
	if (!fetchedWeather) return;

	return {
		/* in fetchedWeather.current */
		dateTime: dt
			.fromMillis(fetchedWeather.current.dt)
			.toLocaleString(dt.TIME_SIMPLE), // string, ex '09:30 AM', only 12-hr if locale is
		sunrise: dt
			.fromMillis(fetchedWeather.current.sunrise)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // string, ex '09:30:23 AM Eastern Daylight Time'
		sunset: dt
			.fromMillis(fetchedWeather.current.sunset)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET),
		temp: Math.round(fetchedWeather.current.temp), // int, Kelvin
		feelsLike: Math.round(fetchedWeather.current.feels_like), // int, Kelvin
		pressure: Math.round(fetchedWeather.current.pressure), // int, hPa
		humidity: Math.round(fetchedWeather.main.humidity * 100) + '%', // string, ex 90%
		dewPoint: Math.round(fetchedWeather.current.dew_point), // int, Kelvin
		cloudCover: Math.round(fetchedWeather.current.clouds * 100) + '%', // string, ex 75%
		uvIndex: fetchedWeather.current.uvi, // decimal, UV index
		visibility: fetchedWeather.current.visibility, // int, meters -> use getImperialVisibility to convert to miles
		windSpeed: fetchedWeather.current.wind_speed, // decimal, m/s
		windGust: fetchedWeather.current.wind_gust, // decimal, m/s, possibly not available
		windDirection: getWindDirectionFromDeg(fetchedWeather.current.wind_deg), // string, ex. 'N/NE'

		/* possibly not available */
		rain: fetchedWeather.current.rain ? fetchedWeather.current.rain['1h'] : 0, // rainfall last hour, mm
		snow: fetchedWeather.current.snow ? fetchedWeather.current.snow['1h'] : 0, // snow accumulation last hour, mm

		/* in weather: Array */
		weatherId: fetchedWeather.current.weather[0].id, // int
		weatherType: fetchedWeather.current.weather[0].main, // string, ex. 'Clear', 'Snow',
		weatherDescription: fetchedWeather.current.weather[0].description, // string
		weatherIcon: getWeatherIcon(fetchedWeather.current.weather[0].icon), // string
	};
};

// get hourly weather
export const parseHourlyWeather = fetchedWeather => {
	if (!fetchedWeather) return;

	return {
		dateTime: dt.fromMillis(fetchedWeather.hourly.dt), // a luxon DateTime Object
		temp: Math.round(fetchedWeather.hourly.temp), // int, Kelvin
		feelsLike: Math.round(fetchedWeather.hourly.feels_like), // int
		pressure: Math.round(fetchedWeather.hourly.pressure), // int
		humidity: Math.round(fetchedWeather.hourly.humidity), // int
		dewpoint: Math.round(fetchedWeather.hourly.dew_point), // int
		uvi: fetchedWeather.hourly.uvi, // decimal
		cloudCover: Math.round(fetchedWeather.hourly.clouds * 100) + '%', // string, ex 75%
		visibility: fetchedWeather.hourly.visibility, // int, miles
		windSpeed: fetchedWeather.hourly.wind_speed, // mph imperial, m/s metric
		windGust: fetchedWeather.hourly.wind_gust, // mph imperial, m/s metric
		windDirection: getWindDirectionFromDeg(fetchedWeather.hourly.wind_deg), // string, ex. 'N/NE'
		pop: Math.round(fetchedWeather.hourly.pop * 100) + '%', // string, probability of precipitation
		rain: fetchedWeather.hourly.rain['1h'], // decimal, mm rainfall
		snow: fetchedWeather.hourly.snow['1h'], // decimal, mm snow accumulation

		/* in weather: Array */
		weatherId: fetchedWeather.hourly.weather[0].id, // int
		weatherName: fetchedWeather.hourly.weather[0].main, // string
		weatherDescription: fetchedWeather.hourly.weather[0].description, // string
		weatherIcon: fetchedWeather.hourly.weather[0].main, // string
	};
};

export const parseMinutelyWeather = fetchedWeather => {
	if (!fetchedWeather) return;

	return fetchedWeather.minutely.map(obj => ({
		dateTime: dt.fromMillis(obj.dt), // a luxon DateTime Object
		precipitation: obj.precipitation, // precipitation volume, mm
	}));
};

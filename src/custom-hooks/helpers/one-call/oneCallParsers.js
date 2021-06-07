import { DateTime as dt } from 'luxon';

/////////////
/* HELPERS */
/////////////

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
export const getMetricVisibility = val => Number((val / 1000).toFixed(1));

export const getImperialVisibility = val =>
	Number((val * 0.000621371).toFixed(2));

//////////////////////
/* WEATHER LOCATION */
//////////////////////

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

/////////////////////
/* CURRENT WEATHER */
/////////////////////

/* we're using Luxon, built by one of the maintainers of Moment.js (now legacy), to do dateTime handling for us -- dt is the (aliased) luxon constructor DateTime, we're using .fromMillis() to convert unix UTC epoch timestamps provided by open weather and luxon's preset constants like dt.TIME_SIMPLE for generating different dateTime formats -- see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html for more details */

export const parseCurrentWeather = current => {
	if (!current) return;

	return {
		/* in fetchedWeather.current */
		dateTime:
			dt.fromMillis(current.dt * 1000).weekdayLong +
			', ' +
			dt.fromMillis(current.dt * 1000).monthLong +
			' ' +
			dt.fromMillis(current.dt * 1000).day +
			' • ' +
			dt.fromMillis(current.dt * 1000).toLocaleString(dt.TIME_SIMPLE), // string, ex '09:30 AM', only 12-hr if locale is
		sunrise: dt
			.fromMillis(current.sunrise * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // string, ex '09:30:23 AM Eastern Daylight Time'
		sunset: dt
			.fromMillis(current.sunset * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // (see sunrise above)
		temp: Math.round(current.temp), // int, Kelvin
		feelsLike: Math.round(current.feels_like), // int, Kelvin
		pressure: Math.round(current.pressure), // int, hPa
		humidity: Math.round(current.humidity) + '%', // string, ex 90%
		dewPoint: Math.round(current.dew_point), // int, Kelvin
		cloudCover: Math.round(current.clouds) + '%', // string, ex 75%
		uvIndex: current.uvi, // decimal, UV index
		visibility: current.visibility, // int, meters -> use getImperialVisibility to convert to miles
		windSpeed: current.wind_speed, // decimal, m/s
		windGust: current.wind_gust || 0.0, // decimal, m/s /* possibly not available */
		windDirection: getWindDirectionFromDeg(current.wind_deg), // string, ex. 'N/NE'

		/* possibly not available */
		rain: current.rain ? current.rain['1h'] : 0.0, // rainfall last hour, mm
		snow: current.snow ? current.snow['1h'] : 0.0, // snow accumulation last hour, mm

		/* in weather: Array */
		weatherId: current.weather[0].id, // int
		weatherType: current.weather[0].main, // string, ex. 'Clear'
		weatherDescription: current.weather[0].description, // string, ex. 'few clouds'
		weatherIcon: getWeatherIcon(current.weather[0].icon), // string, ex. '10d'
	};
};

//////////////////////
/* MINUTELY WEATHER */
//////////////////////

// get time and precipitation from minutely: Array[{}, ...]
export const parseMinutelyWeather = minutely => {
	if (!minutely) return;

	return minutely.map(minutely => ({
		dateTime: dt.fromMillis(minutely * 1000).toLocaleString(dt.TIME_SIMPLE),
		precipitation: minutely.precipitation, // decimal, precipitation volume, mm
	}));
};

////////////////////
/* HOURLY WEATHER */
////////////////////

// get hourly weather from hourly: Array[{}, ...]
export const parseHourlyWeather = hourly => {
	if (!hourly) return;

	return hourly.map(hourly => ({
		/* in fetchedWeather.hourly */
		dateTime:
			dt.fromMillis(hourly.dt * 1000).toLocaleString(dt.TIME_SIMPLE) ===
			'12:00 AM'
				? // for 12:00 AM TIME_SIMPLE, return an array -- first entry is "Monday, June 1", second is 12:00 AM
				  [
						dt.fromMillis(hourly.dt * 1000).weekdayLong +
							', ' +
							dt.fromMillis(hourly.dt * 1000).monthLong +
							' ' +
							dt.fromMillis(hourly.dt * 1000).day,
						dt.fromMillis(hourly.dt * 1000).toLocaleString(dt.TIME_SIMPLE),
				  ]
				: dt.fromMillis(hourly.dt * 1000).toLocaleString(dt.TIME_SIMPLE),
		temp: Math.round(hourly.temp), // int, Kelvin
		feelsLike: Math.round(hourly.feels_like), // int, Kelvin
		pressure: Math.round(hourly.pressure), // int, hPa
		humidity: Math.round(hourly.humidity) + '%', // string, ex 90%
		dewPoint: Math.round(hourly.dew_point), // int, Kelvin
		cloudCover: Math.round(hourly.clouds) + '%', // string, ex 75%
		uvIndex: hourly.uvi, // decimal, UV index
		visibility: hourly.visibility, // int, meters -> use getImperialVisibility to convert to miles
		windSpeed: hourly.wind_speed, // decimal, m/s
		windGust: hourly.wind_gust || 0.0, // decimal, m/s /* possibly not available */
		windDirection: getWindDirectionFromDeg(hourly.wind_deg), // string, ex. 'N/NE'

		pop: Math.round(hourly.pop) + '%', // string, ex. '15%'
		/* possibly not available */
		rain: hourly.rain ? hourly.rain['1h'] : 0.0, // rainfall last hour, mm
		snow: hourly.snow ? hourly.snow['1h'] : 0.0, // snow accumulation last hour, mm

		/* in weather: Array */
		weatherId: hourly.weather[0].id, // int
		weatherType: hourly.weather[0].main, // string, ex. 'Clear'
		weatherDescription: hourly.weather[0].description, // string, ex. 'few clouds'
		weatherIcon: getWeatherIcon(hourly.weather[0].icon), // string, ex. '10d'
	}));
};

///////////////////
/* DAILY WEATHER */
///////////////////

/*
	getMoonPhaseIconAndDescription... helper returns an object structured:

	{
		icon: '/assets/last-quarter-moon.svg',
		description: 'last quarter moon'
	}

	used to generate moon-phase info for current weather view and daily view
*/
const getMoonPhaseIconAndDescription = val => {
	let iconString;

	switch (true) {
		case val === 0 || val === 1:
			iconString = 'new-moon';
			break;
		case val < 0.25:
			iconString = 'waxing-crescent-moon';
			break;
		case val === 0.25:
			iconString = 'first-quarter-moon';
			break;
		case val < 0.5:
			iconString = 'waxing-gibbous-moon';
			break;
		case val === 0.5:
			iconString = 'full-moon';
			break;
		case val < 0.75:
			iconString = 'waning-gibbous-moon';
			break;
		case val === 0.75:
			iconString = 'last-quarter-moon';
			break;
		case val < 1:
			iconString = 'waning-crescent-moon';
			break;
		default:
			return '';
	}

	return {
		icon: `/assets/${iconString}.svg`,
		description: iconString.replace(/-/g, ' ').replace(/\smoon/g, ''),
	};
};

// get daily weather from hourly: Array[{}, ...]
export const parseDailyWeather = daily => {
	if (!daily) return;

	return daily.map(daily => ({
		dateTime:
			dt.fromMillis(daily.dt * 1000).weekdayLong +
			', ' +
			dt.fromMillis(daily.dt * 1000).monthLong +
			' ' +
			dt.fromMillis(daily.dt * 1000).day, // string, ex. 'Monday, June 7'
		sunrise: dt
			.fromMillis(daily.sunrise * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // string, ex '09:30:23 AM Eastern Daylight Time'
		sunset: dt
			.fromMillis(daily.sunset * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // (see sunrise above)
		moonrise: dt
			.fromMillis(daily.moonrise * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // string, ex '09:30:23 AM Eastern Daylight Time'
		moonset: dt
			.fromMillis(daily.moonset * 1000)
			.toLocaleString(dt.TIME_WITH_LONG_OFFSET), // (see sunrise above)

		/*
			from openweather api:

			daily.moon_phase -- 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
		*/

		moonPhase: getMoonPhaseIconAndDescription(daily.moon_phase), // returns an object structured { icon: '/assets/full-moon.svg', description: 'full moon' }

		morningTemp: Math.round(daily.temp.morn), // int
		dayTemp: Math.round(daily.temp.day), // int
		eveningTemp: Math.round(daily.temp.eve), // int
		nightTemp: Math.round(daily.temp.night), // int
		lowTemp: Math.round(daily.temp.min), // int
		highTemp: Math.round(daily.temp.max), // int

		feelsLikeMorning: Math.round(daily.feels_like.morn), // int
		feelsLikeDay: Math.round(daily.feels_like.day), // int
		feelsLikeEvening: Math.round(daily.feels_like.eve), // int
		feelsLikeNight: Math.round(daily.feels_like.night), // int

		pressure: Math.round(daily.pressure), // int, hPa
		humidity: Math.round(daily.humidity) + '%', // string, ex 90%
		dewPoint: Math.round(daily.dew_point), // int, Kelvin
		cloudCover: Math.round(daily.clouds) + '%', // string, ex 75%
		uvIndex: daily.uvi, // decimal, UV index

		/* no visibility on fetchedWeather.daily[idx]! */

		windSpeed: daily.wind_speed, // decimal, m/s
		windGust: daily.wind_gust || 0.0, // decimal, m/s /* possibly not available */
		windDirection: getWindDirectionFromDeg(daily.wind_deg), // string, ex. 'N/NE'

		pop: Math.round(daily.pop) + '%', // string, ex. '15%'
		/* possibly not available */
		rain: daily.rain ? daily.rain['1h'] : 0.0, // rainfall last hour, mm
		snow: daily.snow ? daily.snow['1h'] : 0.0, // snow accumulation last hour, mm

		/* in weather: Array */
		weatherId: daily.weather[0].id, // int
		weatherType: daily.weather[0].main, // string, ex. 'Clear'
		weatherDescription: daily.weather[0].description, // string, ex. 'few clouds'
		weatherIcon: getWeatherIcon(daily.weather[0].icon), // string, ex. '10d'
	}));
};

////////////////////
/* WEATHER ALERTS */
////////////////////

export const getWeatherAlerts = alerts => {
	if (alerts) return;

	return alerts.map(alert => ({
		name: alert.sender_name, // string, ex. 'NWS Tulsa'
		event: alert.event, // string, ex. 'Heat Advisory'
		startTime: dt
			.fromMillis(alert.start * 1000)
			.toLocaleString(dt.DATETIME_HUGE_WITH_SECONDS), // 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'
		endTime: dt
			.fromMillis(alert.end * 1000)
			.toLocaleString(dt.DATETIME_HUGE_WITH_SECONDS), // 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'
		description: alert.description, // long string, ex "...HEAD ADVISORY REMAINS IN EFFECT...(paragraph follows)"
	}));
};

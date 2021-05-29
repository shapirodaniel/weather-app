/*
  weather can be more than length == 1; ex., London mist + light intensity drizzle

  to access weather icon -> icon: 10d @ 2x .png
    http://openweathermap.org/img/wn/10d@2x.png

  to get fahrenheit or imperial
    http://api.openweathermap.org/data/2.5/weather?q=London&units=imperial

  weather condition codes, name, description, and icons obj {day, night}

  to access: weather[weatherCode][name | description | [icon][day | night]]

  ex,

  weatherCode[200] yields
  {
		name: 'Thunderstorm',
		description: 'thunderstorm with light rain',
		icon: { day: '11d', night: '' },
	},

  ex, fetch thunderstorm blurb:
    const thunderstormCode = 200
    const blurb = weather[thunderstormCode].description === 'thunderstorm with light rain'

  ex, fetch snow day icon:
    const snowDayCode = 600
    const snowDayIcon = weather[snowDayCode].icon.day === '13d'
*/

export const weatherCode = {
	200: {
		name: 'Thunderstorm',
		description: 'thunderstorm with light rain',
		icon: { day: '11d', night: '' },
	},
	201: {
		name: 'Thunderstorm',
		description: 'thunderstorm with rain',
		icon: { day: '11d', night: '' },
	},
	202: {
		name: 'Thunderstorm',
		description: 'thunderstorm with heavy rain',
		icon: { day: '11d', night: '' },
	},
	210: {
		name: 'Thunderstorm',
		description: 'light thunderstorm',
		icon: { day: '11d', night: '' },
	},
	211: {
		name: 'Thunderstorm',
		description: 'thunderstorm',
		icon: { day: '11d', night: '' },
	},
	212: {
		name: 'Thunderstorm',
		description: 'heavy thunderstorm',
		icon: { day: '11d', night: '' },
	},
	221: {
		name: 'Thunderstorm',
		description: 'ragged thunderstorm',
		icon: { day: '11d', night: '' },
	},
	230: {
		name: 'Thunderstorm',
		description: 'thunderstorm with light drizzle',
		icon: { day: '11d', night: '' },
	},
	231: {
		name: 'Thunderstorm',
		description: 'thunderstorm with drizzle',
		icon: { day: '11d', night: '' },
	},
	232: {
		name: 'Thunderstorm',
		description: 'thunderstorm with heavy drizzle',
		icon: { day: '11d', night: '' },
	},

	300: {
		name: 'Drizzle',
		description: 'light intensity drizzle',
		icon: { day: '09d', night: '' },
	},
	301: {
		name: 'Drizzle',
		description: 'drizzle',
		icon: { day: '09d', night: '' },
	},
	302: {
		name: 'Drizzle',
		description: 'heavy intensity drizzle',
		icon: { day: '09d', night: '' },
	},
	310: {
		name: 'Drizzle',
		description: 'light intensity drizzle rain',
		icon: { day: '09d', night: '' },
	},
	311: {
		name: 'Drizzle',
		description: 'drizzle rain',
		icon: { day: '09d', night: '' },
	},
	312: {
		name: 'Drizzle',
		description: 'heavy intensity drizzle rain',
		icon: { day: '09d', night: '' },
	},
	313: {
		name: 'Drizzle',
		description: 'shower rain and drizzle',
		icon: { day: '09d', night: '' },
	},
	314: {
		name: 'Drizzle',
		description: 'heavy shower rain and drizzle',
		icon: { day: '09d', night: '' },
	},
	321: {
		name: 'Drizzle',
		description: 'shower drizzle',
		icon: { day: '09d', night: '' },
	},

	500: {
		name: 'Rain',
		description: 'light rain',
		icon: { day: '10d', night: '' },
	},
	501: {
		name: 'Rain',
		description: 'moderate rain',
		icon: { day: '10d', night: '' },
	},
	502: {
		name: 'Rain',
		description: 'heavy intensity rain',
		icon: { day: '10d', night: '' },
	},
	503: {
		name: 'Rain',
		description: 'very heavy rain',
		icon: { day: '10d', night: '' },
	},
	504: {
		name: 'Rain',
		description: 'extreme rain',
		icon: { day: '10d', night: '' },
	},
	511: {
		name: 'Rain',
		description: 'freezing rain',
		icon: { day: '13d', night: '' },
	},
	520: {
		name: 'Rain',
		description: 'light intensity shower rain',
		icon: { day: '09d', night: '' },
	},
	521: {
		name: 'Rain',
		description: 'shower rain',
		icon: { day: '09d', night: '' },
	},
	522: {
		name: 'Rain',
		description: 'heavy intensity shower rain',
		icon: { day: '09d', night: '' },
	},
	531: {
		name: 'Rain',
		description: 'ragged shower rain',
		icon: { day: '09d', night: '' },
	},

	600: {
		name: 'Snow',
		description: 'light snow',
		icon: { day: '13d', night: '' },
	},
	601: {
		name: 'Snow',
		description: 'Snow',
		icon: { day: '13d', night: '' },
	},
	602: {
		name: 'Snow',
		description: 'Heavy snow',
		icon: { day: '13d', night: '' },
	},
	611: {
		name: 'Snow',
		description: 'Sleet',
		icon: { day: '13d', night: '' },
	},
	612: {
		name: 'Snow',
		description: 'Light shower sleet',
		icon: { day: '13d', night: '' },
	},
	613: {
		name: 'Snow',
		description: 'Shower sleet',
		icon: { day: '13d', night: '' },
	},
	615: {
		name: 'Snow',
		description: 'Light rain and snow',
		icon: { day: '13d', night: '' },
	},
	616: {
		name: 'Snow',
		description: 'Rain and snow',
		icon: { day: '13d', night: '' },
	},
	620: {
		name: 'Snow',
		description: 'Light shower snow',
		icon: { day: '13d', night: '' },
	},
	621: {
		name: 'Snow',
		description: 'Shower snow',
		icon: { day: '13d', night: '' },
	},
	622: {
		name: 'Snow',
		description: 'Heavy shower snow',
		icon: { day: '13d', night: '' },
	},

	701: {
		name: 'Mist',
		description: 'mist',
		icon: { day: '50d', night: '' },
	},
	711: {
		name: 'Smoke',
		description: 'Smoke',
		icon: { day: '50d', night: '' },
	},
	721: {
		name: 'Haze',
		description: 'Haze',
		icon: { day: '50d', night: '' },
	},
	731: {
		name: 'Dust',
		description: 'sand/dust-whirls',
		icon: { day: '50d', night: '' },
	},
	741: { name: 'Fog', description: 'fog', icon: { day: '50d', night: '' } },

	751: {
		name: 'Sand',
		description: 'sand',
		icon: { day: '50d', night: '' },
	},
	761: {
		name: 'Dust',
		description: 'dust',
		icon: { day: '50d', night: '' },
	},
	762: {
		name: 'Ash',
		description: 'volcanic ash',
		icon: { day: '50d', night: '' },
	},
	771: {
		name: 'Squall',
		description: 'squalls',
		icon: { day: '50d', night: '' },
	},
	781: {
		name: 'Tornado',
		description: 'tornado',
		icon: { day: '50d', night: '' },
	},

	800: {
		name: 'Clear',
		description: 'clear sky',
		icon: { day: '01d', night: '01n' },
	},

	801: {
		name: 'Clouds',
		description: 'few clouds: 11-25%',
		icon: { day: '02d', night: '02n' },
	},
	802: {
		name: 'Clouds',
		description: 'scattered clouds: 25-50%',
		icon: { day: '03d', night: '03n' },
	},
	803: {
		name: 'Clouds',
		description: 'broken clouds: 51-84%',
		icon: { day: '04d', night: '04n' },
	},
	804: {
		name: 'Clouds',
		description: 'overcast clouds: 85-100%',
		icon: { day: '04d', night: '04n' },
	},
};

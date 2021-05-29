export const imperialData = {
	base: { stations: 'stations' },
	clouds: { all: '100' },
	cod: 200,
	coord: { lon: -87.65, lat: 41.85 },
	dt: 1622239696,
	id: 4887398,
	main: {
		temp: 46.56,
		feels_like: 43.05,
		temp_min: 43.05,
		temp_max: 49.08,
		pressure: 1019,
	},
	name: 'Chicago',
	rain: { '1h': 0.27 },
	sys: {
		type: 2,
		id: 2005153,
		country: 'US',
		sunrise: 1622197210,
		sunset: 1622250961,
	},
	timezone: -18000,
	visibility: 10000,
	weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
	wind: { speed: 3.13, deg: 17, gust: 5.36 },
};

// to convert
const imperialToMetric = num => Math.round(((num - 32) * 5) / 9);
const { temp_min, temp_max } = imperialData.main;
const avgTemp = () => Math.round(temp_min + temp_max / 2);

export const currentTemps = () => ({
	imperial: avgTemp(),
	metric: imperialToMetric(avgTemp()),
});

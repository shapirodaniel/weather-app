/*
  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
*/

export const parseGeolocation = fetchedGeolocation => {
	if (!fetchedGeolocation) return;

	return {
		name: fetchedGeolocation.name,
		localNames: fetchedGeolocation.local_names,
		location: {
			latitude: fetchedGeolocation.lat,
			longitude: fetchedGeolocation.lon,
		},
		state: fetchedGeolocation.state,
		country: fetchedGeolocation.county,
	};
};

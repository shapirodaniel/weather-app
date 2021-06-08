import useSWR from 'swr';
import axios from 'axios';
import { parseGeolocation } from './helpers/geocoding/geocodingParsers';

const fetcher = uri => axios.get(uri).then(res => res.data);

export const useGeolocation = cityName => {
	const uri = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;

	const { data: fetchedGeolocation, error } = useSWR(uri, fetcher, {
		onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
			if (error.status === 404 || retryCount >= 10) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	return {
		geolocation: fetchedGeolocation && parseGeolocation(fetchedGeolocation[0]),
		geolocationLoading: !error && !fetchedGeolocation,
		geolocationError: error,
	};
};

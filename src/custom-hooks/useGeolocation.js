import useSWR from 'swr';
import axios from 'axios';
import { parseGeolocation } from './helpers/geocoding/geocodingParsers';

// useSWR callback
const fetcher = uri => axios.get(uri).then(res => res.data);

export const useGeolocation = cityName => {
	// useSWR uri
	const uri = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

	const { data: fetchedGeolocation, error } = useSWR(uri, fetcher, {
		/* see https://swr.vercel.app/docs/error-handling for details */
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

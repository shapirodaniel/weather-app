import useSWR from 'swr';
import { fetcher } from './helpers/fetcher';
import { parseWeather } from '../custom-hooks/helpers/data';

export const useWeather = (imperialOrMetric, cityName) => {
	// we'll store our api key in a dotenv file to avoid exposing the key directly, we can gitignore it to avoid pushing the key to a public repo
	const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=${imperialOrMetric}`;

	const { data, error, mutate, isValidating } = useSWR(uri, fetcher, {
		/* https://swr.vercel.app/docs/error-handling */
		onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
			// never retry 404s
			if (error.status === 404) return;
			// max retries 10
			if (retryCount >= 10) return;
			// set timeout on retries
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	// we'll return our weather, a loading boolean, and an error object
	return {
		weather: parseWeather(data),
		updateWeather: () => mutate(),
		loading: isValidating,
		error,
	};
};

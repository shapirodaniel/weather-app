import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from './helpers/fetcher';
import { parseWeather } from '../custom-hooks/helpers/data';

export const useWeather = (imperialOrMetric, cityName) => {
	// we'll store our api key in a dotenv file to avoid exposing the key directly, we can gitignore it to avoid pushing the key to a public repo
	const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

	////////////////////////////////////////
	/* VERCEL STALE WHILE REVALIDATE HOOK */
	////////////////////////////////////////

	// const {
	// 	data: fetchedWeather,
	// 	error,
	// 	isValidating,
	// } = useSWR(uri, fetcher, {
	// 	/* see https://swr.vercel.app/docs/error-handling for details */
	// 	onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
	// 		if (error.status === 404 || retryCount >= 10) return;
	// 		setTimeout(() => revalidate({ retryCount }), 5000);
	// 	},
	// });

	//////////////////////////////
	/* ALT REACT HOOKS SOLUTION */
	//////////////////////////////

	const initState = {
		fetchedWeather: null,
		error: '',
	};

	const [state, setState] = useState(initState);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const { data: fetchedWeather } = await axios.get(uri);
				setState({ fetchedWeather, error: '' });
			} catch (err) {
				console.error(err);
				setState({ ...state, error: err });
			}
		};
		fetchWeather();
		// linter expects dependencies we don't want to track, we only want to update fetches when our useWeather hook inputs change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imperialOrMetric, cityName]);

	// comment out next line if vercel useSWR hook is used
	const { fetchedWeather, error } = state;

	const isImperial = imperialOrMetric === 'imperial';

	return {
		weather: parseWeather(fetchedWeather, isImperial),
		loading: !error && !fetchedWeather,
		error,
	};
};

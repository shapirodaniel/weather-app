import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {
	parseCurrentWeather,
	parseMinutelyWeather,
	parseHourlyWeather,
	parseDailyWeather,
} from './helpers/one-call/oneCallParsers';

// function we'll pass to useSWR
const fetcher = uri => axios.get(uri).then(res => res.data);

export const useWeather = ({ latitude, longitude }) => {
	// we'll store our api key in a dotenv file to avoid exposing the key directly, we can gitignore it to avoid pushing the key to a public repo
	const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

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
				setState({
					weather: {
						current: parseCurrentWeather(fetchedWeather.current),
						minutely: parseMinutelyWeather(fetchedWeather.minutely),
						hourly: parseHourlyWeather(fetchedWeather.hourly),
						daily: parseDailyWeather(fetchedWeather.daily),
					},
					error: '',
				});
			} catch (err) {
				console.error(err);
				setState({ ...state, error: err });
			}
		};
		fetchWeather();
		// linter expects dependencies we don't want to track, we only want to update fetches when our useWeather hook inputs change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latitude, longitude]);

	// comment out next line if vercel useSWR hook is used
	const { weather, error } = state;

	return {
		weather,
		weatherLoading: !error && !weather,
		weatherError: error,
	};
};

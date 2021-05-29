import { useState, useEffect, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { fetcher } from './helpers/fetcher';
import { parseWeather } from './helpers/data';

// useWeather takes in a system string 'imperial' or 'metric' F/C
// and returns an obj
/*
  const {
    data: {parsed-weather-object},
    updateWeather: updater function, takes opt newURI param,
    isUpdating: Boolean,
    error:
*/

export const useWeather = (metricOrImperial, cityName) => {
	// we'll store our api key in a dotenv file to avoid exposing the key directly, we can gitignore it to avoid pushing the key to a public repo
	const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

	const { data, mutate, error, isValidating } = useSWR(uri, fetcher, {
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

	// whenever our user toggles their settings for imperial/metric we'll update the data -- react prompts us with our linter settings on exhaustive-deps to wrap this fn in a useCallback hook to avoid an infinite render loop in useEffect
	const isImperial = useCallback(
		() => metricOrImperial === 'imperial',
		[metricOrImperial]
	);

	// let's store a mutable reference with useRef so that we can update our weather values locally whenever our user toggles their imperial/metric settings
	const weatherRef = useRef({
		weather: parseWeather(data, isImperial(metricOrImperial)),
	});

	// every 1 min we'll fetch an update by updating our timeFlag boolean with an infinite setTimeout loop
	const [timeFlag, updateTime] = useState(false);

	const timer = () =>
		setTimeout(() => {
			while (true) {
				updateTime(!timeFlag);
			}
		}, 60000);

	timer();

	// we'll update our ref whenever updates are triggered by useSWR or our user toggles imperial/metric or their city, otherwise our timer will trigger periodic refreshes with the current units + city
	useEffect(() => {
		weatherRef.current.weather = parseWeather(
			data,
			isImperial(metricOrImperial, cityName)
		);
		// list of dependencies that will trigger useEffect
	}, [data, isImperial, metricOrImperial, cityName, timeFlag]);

	// we'll return our weather, a loading boolean, and an error object
	return {
		weather: weatherRef.current.weather,
		loading: isValidating,
		error,
	};
};

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	parseCurrentWeather,
	parseMinutelyWeather,
	parseHourlyWeather,
	parseDailyWeather,
} from './helpers/one-call/oneCallParsers';

export const useWeather = ({ latitude, longitude }) => {
	const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

	const [state, setState] = useState({});

	useEffect(() => {
		let isMounted = true;

		const fetchWeather = async () => {
			try {
				const { data: fetchedWeather } = await axios.get(uri);

				const newState = {
					weather: {
						current: parseCurrentWeather(fetchedWeather.current),
						minutely: parseMinutelyWeather(fetchedWeather.minutely),
						hourly: parseHourlyWeather(fetchedWeather.hourly),
						daily: parseDailyWeather(fetchedWeather.daily),
					},
					error: '',
				};

				setState(newState);
			} catch (err) {
				console.error(err);
				setState({ ...state, error: err });
			}
		};

		if (isMounted && latitude && longitude) fetchWeather();

		return () => {
			isMounted = false;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latitude, longitude]);

	const { weather, error } = state;

	return {
		weather,
		weatherLoading: !error && !weather,
		weatherError: error,
	};
};

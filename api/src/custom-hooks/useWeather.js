import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	parseCurrentWeather,
	parseMinutelyWeather,
	parseHourlyWeather,
	parseDailyWeather,
} from './helpers/one-call/oneCallParsers';

export const useWeather = ({ latitude, longitude }, shouldRefresh, reset) => {
	const [state, setState] = useState({});

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const { data: fetchedWeather } = await axios.post('/api/oneCall', {
					latitude,
					longitude,
				});

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

				// reset weatherContext shouldRefresh boolean -- handles refresh requests
				reset();
			} catch (err) {
				console.error(err);
				setState({ ...state, error: err });
			}
		};

		if (latitude && longitude) fetchWeather();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latitude, longitude, shouldRefresh]);

	const { weather, error } = state;

	return {
		weather,
		weatherLoading: !error && !weather,
		weatherError: error,
	};
};

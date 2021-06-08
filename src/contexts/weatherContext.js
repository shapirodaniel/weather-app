import React, { useState, useReducer } from 'react';
import { useGeolocation } from '../custom-hooks/useGeolocation';
import { useWeather } from '../custom-hooks/useWeather';

export const WeatherContext = React.createContext();

// action types for action creators in WeatherProvider
const TOGGLE_IMPERIAL_OR_METRIC = 'TOGGLE_IMPERIAL_OR_METRIC';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';

// reducer fn used by useReducer hook in WeatherProvider
const reducer = (state, { type, payload }) => {
	switch (type) {
		case TOGGLE_IMPERIAL_OR_METRIC:
			return { ...state, imperialOrMetric: payload };
		case SET_CURRENT_CITY:
			return { ...state, cityName: payload };
		default:
			return state;
	}
};

const WeatherProvider = ({ children }) => {
	// initialize a weather config object to prevent corrupting the one stored in localStorage
	const initWeatherConfig = {
		imperialOrMetric: 'imperial',
		cityName: 'Philadelphia',
	};

	// then retrieve the localStorage config
	const localStorageWeatherConfig = JSON.parse(
		localStorage.getItem('weatherConfig')
	);

	let weatherConfig = initWeatherConfig;

	// merge the init config with the retrieved one if defined
	if (localStorageWeatherConfig) {
		weatherConfig = {
			...weatherConfig,
			...localStorageWeatherConfig,
		};
	}

	// the merged value is what we'll send to our reducer as its initState
	const [state, dispatch] = useReducer(reducer, weatherConfig);

	// and we'll use the cityName to fetch our current geolocation
	const { geolocation, geolocationLoading, geolocationError } = useGeolocation(
		state.cityName
	);

	// gives user ability to request new weather data
	const [shouldRefresh, toggleRefresh] = useState(false);
	const refresh = () => {
		toggleRefresh(true);
	};
	const reset = () => {
		toggleRefresh(false);
	};

	// we'll provide a default location value when our geolocation is unresolved,
	// otherwise latitude, longitude will be our user's current position
	// and we'll pass in our local state for handling weather data requests
	const { weather, weatherLoading, weatherError } = useWeather(
		geolocation
			? geolocation.location
			: {
					latitude: 39.95,
					longitude: -75.17, // defaults to Philly :)
			  },
		shouldRefresh,
		reset
	);

	// dispatch-wrapped action creators
	const updateUnits = units => {
		localStorage.setItem(
			'weatherConfig',
			JSON.stringify({
				...state,
				imperialOrMetric: units,
			})
		);
		dispatch({
			type: TOGGLE_IMPERIAL_OR_METRIC,
			payload: units,
		});
	};

	const updateCity = city => {
		localStorage.setItem(
			'weatherConfig',
			JSON.stringify({ ...state, cityName: city })
		);
		dispatch({
			type: SET_CURRENT_CITY,
			payload: city,
		});
	};

	// the final store-like object we'll have access to in our App
	// our geolocation is available for other features like an interactive weather map
	// translations provided by the geolocation object can be used to improve accessibility
	const providerValue = {
		...state, // cityName: string, imperialOrMetric: boolean
		geolocation: {
			...geolocation, // object
			loading: geolocationLoading, // boolean
			error: geolocationError, // Error instance: object
		},
		weather: {
			current: weather && weather.current, // object
			minutely: weather && weather.minutely, // array
			hourly: weather && weather.hourly, // array
			daily: weather && weather.daily, // array
			loading: weather && weatherLoading, // boolean
			error: weather && weatherError, // Error instance: object
		},
		refresh,
		updateUnits, // updater fn, params: boolean (imperialOrMetric)
		updateCity, // updater fn, params: string (cityName)
	};

	return (
		<WeatherContext.Provider value={providerValue}>
			{children}
		</WeatherContext.Provider>
	);
};

export default WeatherProvider;

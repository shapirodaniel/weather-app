import React, { useReducer } from 'react';
import { useGeolocation } from '../custom-hooks/useGeolocation';
import { useWeather } from '../custom-hooks/useWeather';

export const WeatherContext = React.createContext();

// action types for action creators in WeatherProvider
const TOGGLE_IMPERIAL_OR_METRIC = 'TOGGLE_IMPERIAL_OR_METRIC';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';

// reducer fn used by useReducer hook in WeatherProvider
// note! useReducer takes initState as the second argument, rather than the Redux convention of providing initState as a default parameter to the reducer fn itself
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

// WeatherProvider is a React context that will make up-to-date data and functions available to its entire subtree -- we'll wrap our App so that the provider acts like Redux's Provider -- our providerValue is similar to Redux's store
// since WeatherProvider needs to render its subtree we'll use the children prop here
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

	// we'll provide a default location value when our geolocation is unresolved, else latitude, longitude will be our user's current position
	const { weather, weatherLoading, weatherError } = useWeather(
		geolocation
			? geolocation.location
			: {
					latitude: 39.95,
					longitude: -75.17, // defaults to Philly :D
			  }
	);

	// here we'll define our action creators so that we can dispatch changes to toggle imperialOrMetric and cityName
	const toggleImperialOrMetric = unitsString => ({
		type: TOGGLE_IMPERIAL_OR_METRIC,
		payload: unitsString,
	});

	const setCurrentCity = cityString => ({
		type: SET_CURRENT_CITY,
		payload: cityString,
	});

	// and we'll create updaters with localStorage + dispatch functionality here so that we don't need to expose any of our state management logic except the updater fn itself -- similar to what we'd do to connect Redux components with connect HOC or useDispatch
	const updateUnits = units => {
		localStorage.setItem(
			'weatherConfig',
			JSON.stringify({
				...state,
				imperialOrMetric: units,
			})
		);
		dispatch(toggleImperialOrMetric(units));
	};

	const updateCity = city => {
		localStorage.setItem(
			'weatherConfig',
			JSON.stringify({ ...state, cityName: city })
		);
		dispatch(setCurrentCity(city));
	};

	// the final store-like object we'll have access to in our App
	// by modularizing our logic we provide a clean interface to accessing and updating state, and our child components can use these objects without "knowing" how they work!
	// our geolocation is available for other features like an interactive weather map, and translations provided by the geolocation object can be used to improve accessibility
	const providerValue = {
		...state,
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
		updateUnits,
		updateCity,
	};

	return (
		<WeatherContext.Provider value={providerValue}>
			{children}
		</WeatherContext.Provider>
	);
};

export default WeatherProvider;

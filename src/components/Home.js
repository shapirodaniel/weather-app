import React, { useContext } from 'react';
import styled from 'styled-components';
import { WeatherContext } from '../contexts/weatherContext';
import CurrentWeather from './CurrentWeather';

const Background = styled.div`
	background-image: ${({ type }) =>
		`url(https://source.unsplash.com/random?${
			type + (new Date().getHours() >= 19 ? ',night' : '') // append "night" to query if time > 7PM local
		})`};
	background-repeat: no-repeat;
	// this positioning ensures that we fill the available space no matter the fetched image size
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	background-size: cover;
	// z-index places image behind the rest of our content
	z-index: -1;
`;

const Home = () => {
	const { weather, weatherError, cityName, imperialOrMetric } =
		useContext(WeatherContext);

	if (weatherError) {
		return null;
	}

	const { weatherType, temp, feelsLike, weatherDescription, weatherIcon } =
		(weather && weather.current) || {};

	const isImperial = imperialOrMetric === 'imperial';

	return (
		<>
			<Background type={weatherType} />
			<CurrentWeather
				temp={temp}
				feelsLike={feelsLike}
				weatherDescription={weatherDescription}
				weatherIcon={weatherIcon}
				imperialOrMetric={imperialOrMetric}
				isImperial={isImperial}
				cityName={cityName}
			/>
		</>
	);
};

export default Home;

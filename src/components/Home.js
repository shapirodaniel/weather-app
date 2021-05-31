import React, { useContext } from 'react';
import styled from 'styled-components';
import { WeatherContext } from '../contexts/weatherContext';
import SwipeCarousel from './SwipeCarousel';
import CurrentWeather from './CurrentWeather';

const Background = styled.div`
	background-image: ${({ type }) =>
		`url(https://source.unsplash.com/random?${
			type + (new Date().getHours() >= 19 ? ',night' : '') // append "night" to query if time > 7PM local
		})`};
	// this positioning ensures that we fill the available space no matter the fetched image size
	background-repeat: no-repeat;
	background-size: cover;
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	// z-index places image behind the rest of our content
	z-index: -1;
`;

const Relief = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 5px;
	height: 88%;
	width: 88%;
	margin: auto;
	margin-top: 1.5em;
`;

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 80vh;
	width: 78vw;
	margin: 0 auto;
	padding: 2em;
`;

const Home = () => {
	const { weather, weatherError, cityName, imperialOrMetric } =
		useContext(WeatherContext);

	if (weatherError) {
		return null;
	}

	const {
		weatherType,
		temp,
		feelsLike,
		weatherDescription,
		weatherIcon,
		dateTime,
	} = (weather && weather.current) || {};

	const isImperial = imperialOrMetric === 'imperial';

	const slideArray = [
		{
			renderComponent: () => (
				<Layout>
					<CurrentWeather
						temp={temp}
						feelsLike={feelsLike}
						weatherDescription={weatherDescription}
						weatherIcon={weatherIcon}
						imperialOrMetric={imperialOrMetric}
						isImperial={isImperial}
						cityName={cityName}
						dateTime={dateTime}
					/>
				</Layout>
			),
		},
		{ renderComponent: () => <div>hi</div> },
		{
			renderComponent: () => <div>hi</div>,
		},
	];

	return (
		<>
			<Background type={weatherType} />
			<Relief>
				<SwipeCarousel slideArray={slideArray} />
			</Relief>
		</>
	);
};

export default Home;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { WeatherContext } from '../contexts/weatherContext';
import SwipeCarousel from './SwipeCarousel';
import CurrentWeather from './CurrentWeather';
import Loading from './Loading';
import DailyDetails from './DailyDetails';
import Hourly from './Hourly';

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
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 5px;
	height: 88%;
	width: 88%;
	margin: auto;
	margin-top: 1.5em;
	overflow: hidden;
`;

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 80vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 2em 0;
`;

const Home = () => {
	const { weather, weatherError, weatherLoading, cityName, imperialOrMetric } =
		useContext(WeatherContext);

	if (weatherError) {
		return null;
	}

	if (weatherLoading) {
		return <Loading />;
	}

	const isImperial = imperialOrMetric === 'imperial';

	const slideArray = [
		{
			renderComponent: () => (
				<Layout>
					<CurrentWeather
						{...weather.current}
						highTemp={(weather.daily && weather.daily[0].highTemp) || ''}
						lowTemp={(weather.daily && weather.daily[0].lowTemp) || ''}
						cityName={cityName}
						isImperial={isImperial}
					/>
				</Layout>
			),
		},
		{
			renderComponent: () => (
				<Layout>
					<DailyDetails daily={weather.daily} isImperial={isImperial} />
				</Layout>
			),
		},
		{
			renderComponent: () => (
				<Layout>
					<Hourly hourly={weather.hourly} isImperial={isImperial} />
				</Layout>
			),
		},
		{
			renderComponent: () => (
				<Layout>
					<div style={{ color: 'white' }}>hi im div</div>
				</Layout>
			),
		},
	];

	return (
		<>
			<Background
				type={weather && weather.current && weather.current.weatherType}
			/>
			<Relief>
				<SwipeCarousel slideArray={slideArray} />
			</Relief>
		</>
	);
};

export default Home;

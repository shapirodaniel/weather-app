import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';
import FCToggle from './FCToggle';
import SetHomeBtn from '../SetHomeBtn';

import { useFetch } from '../../../custom-hooks/useFetch';

const Background = styled.div`
	background-image: ${props =>
		`url(https://source.unsplash.com/random/1200x800?${props.weatherstring})`};
	background-repeat: no-repeat;
	object-fit: contain;
	opacity: 0.8;
	mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`;

const Temperature = styled.div`
	font-size: 48px;
`;

const Home = ({ widgetId }) => {
	const { state, dispatch } = useContext(StateContext);
	const { currentTemp, weatherString } = state;

	const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

	const { data, error } = useFetch(
		`https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}`
	);

	if (data) console.log('data is: ', data);

	return (
		<Background weatherstring={weatherString}>
			<Temperature>{currentTemp}</Temperature>
			<FCToggle />
			<SetHomeBtn widgetId={widgetId} />
		</Background>
	);
};

export default Home;

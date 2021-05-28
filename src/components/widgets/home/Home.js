import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';
import { Loading } from '../../main/';
import FCToggle from './FCToggle';
import SetHomeBtn from '../SetHomeBtn';

import { useFetch } from '../../../custom-hooks/useFetch';

// fake DB response data
import { imperialData, currentTemps } from '../../../fakeDB';
const { imperial, metric } = currentTemps;

const Background = styled.div`
	background-image: ${({ weatherString }) =>
		`url(https://source.unsplash.com/random/1200x800?${weatherString})`};
	background-repeat: no-repeat;
	object-fit: contain;
	opacity: 0.8;
	mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IconContainer = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
`;

const Temperature = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 96px;
	color: orange;
`;

const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const Home = ({ widgetId }) => {
	const { state, dispatch } = useContext(StateContext);
	const { tempType, weatherString } = state;

	const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

	const { data, error } = useFetch(
		`https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}`
	);

	/* these both work, just comment them in later */
	// if (error) return <Redirect to='/404' />;
	// if (!error && !data) return <Loading />;

	return (
		<Background weatherString={weatherString}>
			<Temperature>{tempType === 'fahrenheit' ? imperial : metric}</Temperature>
			<IconContainer>
				<img
					src={getWeatherIcon(imperialData.weather[0].icon)}
					alt={'weather-icon'}
				/>
			</IconContainer>
			<FCToggle />
			<SetHomeBtn widgetId={widgetId} />
		</Background>
	);
};

export default Home;

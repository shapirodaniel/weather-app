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
	/* mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent); */

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const Relief = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 92%;
	width: 88%;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 10px;
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
	font-size: 120px;
	color: ghostwhite;
`;

const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const Home = ({ widgetId }) => {
	const { state, dispatch } = useContext(StateContext);
	const { tempType, weatherString } = state;

	/* careful! */
	// const { data, error } = useFetch(
	// 	`https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
	// );

	/* these both work, just comment them in later */
	// if (error) return <Redirect to='/404' />;
	// if (!error && !data) return <Loading />;

	return (
		<Background weatherString={imperialData.weather[0].main}>
			<Relief>
				<Temperature>
					{tempType === 'fahrenheit' ? imperial : metric}
					{/* <span style={{ fontSize: '48px', marginTop: '-1em' }}>°</span> */}
				</Temperature>
				<IconContainer>
					<img
						src={getWeatherIcon(imperialData.weather[0].icon)}
						alt={'weather-icon'}
					/>
				</IconContainer>
				<FCToggle />
				<SetHomeBtn widgetId={widgetId} />
			</Relief>
		</Background>
	);
};

export default Home;

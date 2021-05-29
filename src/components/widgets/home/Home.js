import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';
import { Loading } from '../../main/';
import FCToggle from './FCToggle';
import SetHomeBtn from '../SetHomeBtn';

// data fetching hook and fetcher
import useSWR from 'swr';
import { fetcher } from '../../fetcher';

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

// utility fn generates an src for the weather icon provided by our weather api
const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const Home = ({ widgetId }) => {
	const { state } = useContext(StateContext);

	const homeURI = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${
		process.env.REACT_APP_OPEN_WEATHER_API_KEY
	}&units=${state.tempType === 'fahrenheit' ? 'imperial' : 'metric'}`;

	const { data, error } = useSWR(homeURI, fetcher);

	console.log(data);

	/* these both work, just comment them in later */
	if (error) return <Redirect to='/404' />;
	if (!error && !data) return <Loading />;

	return (
		<Background weatherString={(data && data.weather[0].main) || 'weather'}>
			<Relief>
				<Temperature>
					{data && Math.round(data.main.temp)}
					{/* <span style={{ fontSize: '48px', marginTop: '-1em' }}>°</span> */}
				</Temperature>
				<IconContainer>
					<img
						// default to mist icon if data unavailable
						src={getWeatherIcon(
							data && data.weather.length && data.weather[0].icon
						)}
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

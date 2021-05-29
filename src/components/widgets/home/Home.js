import React, { useState } from 'react';
import styled from 'styled-components';
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
	// mask clears visual space for our widgets
	mask-image: linear-gradient(to top, transparent, 30%, ghostwhite);
	// this positioning ensures that we fill the available space no matter the fetched image size
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	// z-index places image behind the rest of our content
	z-index: -1;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 78%;
	width: 100%;
`;

const Relief = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 90%;
	background-color: var(--opacityMask);
	border-radius: 10px;
	// margin-top to push away from nav slightly
	margin-top: 1.2em;
`;

const IconContainer = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
	// brightness filter punches up some of the washed-out open weather api icons like "mist"
	filter: brightness(150%);
`;

const Temperature = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 120px;
	color: ghostwhite;
`;

const Description = styled.span`
	margin: 0 auto;
	font-size: 14px;
	color: ghostwhite;
`;

// utility fn generates an src for the weather icon provided by our weather api
const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const Home = ({ widgetId }) => {
	const [imperialOrMetric, setImperialOrMetric] = useState(
		() => localStorage.getItem('imperialOrMetric') || 'imperial'
	);

	const homeURI = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=${imperialOrMetric}`;

	// const { data, error } = useSWR(homeURI, fetcher);

	// console.log(data);

	// /* these both work, just comment them in later */
	// if (error) return <Redirect to='/404' />;
	// if (!error && !data) return <Loading />;

	// temp disabled SWR to work on layout
	const data = false;

	return (
		<>
			<Background weatherString={(data && data.weather[0].main) || 'weather'} />
			<Container>
				<Relief>
					<Temperature>
						{(data && Math.round(data.main.temp)) || '49'}
						{/* <span style={{ fontSize: '48px', marginTop: '-1em' }}>°</span> */}
					</Temperature>
					<Description>
						{(data && data.weather.length && data.weather[0].description) ||
							'few clouds'}
					</Description>
					<IconContainer>
						<img
							// default to mist icon if data unavailable
							src={getWeatherIcon(
								(data && data.weather.length && data.weather[0].icon) || '10d'
							)}
							alt={'weather-icon'}
						/>
					</IconContainer>
					<FCToggle
						currentType={imperialOrMetric}
						toggleType={setImperialOrMetric}
					/>
					<SetHomeBtn widgetId={widgetId} />
				</Relief>
			</Container>
		</>
	);
};

export default Home;

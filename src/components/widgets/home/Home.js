import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
	height: 92%;
	width: 84%;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	// allows us to center in available space without flexing a parent container
	margin: 2em auto 1.5em auto;
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
	margin-left: 20px;
`;

const DegreeSymbol = styled.span`
	& {
		font-size: 48px;
		margin-top: -1.1em;
	}
	// pseudo-element lets us inject content into our DegreeSymbol span
	&::after {
		content: '°';
	}
`;

const Description = styled.span`
	margin: 0 auto;
	font-size: 16px;
	color: ghostwhite;
`;

const FeelsLike = styled.span`
	margin: 0 auto;
	padding: 1em;
	font-size: 16px;
	color: ghostwhite;
`;

// utility fn generates an src for the weather icon provided by our weather api
const getWeatherIcon = iconString =>
	`http://openweathermap.org/img/wn/${iconString}@2x.png`;

const Home = ({ widgetId }) => {
	// we'll pull our user's preferred temperature system out of local storage to persist their choice across refreshes
	const [imperialOrMetric, setImperialOrMetric] = useState(
		() => localStorage.getItem('imperialOrMetric') || 'imperial'
	);

	// provide our home uri through an environment variable to protect our api key when we push to our github repo, and populate the units query with our useState value
	const homeURI = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=${imperialOrMetric}`;

	/* to avoid overfetching from our api while doing work that would cause a bunch of refreshes, comment this block OUT to work on styling */
	const { data, error } = useSWR(homeURI, fetcher);
	console.log(data);
	if (error) return <Redirect to='/404' />;
	if (!error && !data) return <Loading />;

	/* comment this line IN to work on layout if we've commented our our useSWR fetch, this will let us short-circuit all data values and use the defaults */
	// const data = false;

	const weatherString = (data && data.weather[0].main) || 'weather';
	const tempString = (data && Math.round(data.main.temp)) || '75';
	const description =
		(data && data.weather.length && data.weather[0].description) || 'mild';
	const weatherIconSrc = getWeatherIcon(
		// default to "mist" icon if weather unavailable
		(data && data.weather.length && data.weather[0].icon) || '10d'
	);
	const feelsLike =
		(data && data.main && Math.round(data.main.feels_like)) || '75';

	return (
		<>
			<Background weatherString={weatherString} />
			<Container>
				<Relief>
					<Temperature>
						{tempString}
						<DegreeSymbol />
					</Temperature>
					<Description>{description}</Description>
					<IconContainer>
						<img src={weatherIconSrc} alt={'weather-icon'} />
					</IconContainer>
					<FCToggle
						currentType={imperialOrMetric}
						toggleType={setImperialOrMetric}
					/>
					<FeelsLike>
						<em>feels like:</em>{' '}
						{feelsLike + (imperialOrMetric === 'imperial' ? 'F' : 'C')}
					</FeelsLike>
					<SetHomeBtn widgetId={widgetId} />
				</Relief>
			</Container>
		</>
	);
};

export default Home;

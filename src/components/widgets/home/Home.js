import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// import { Loading } from '../../main/';
import FCToggle from './FCToggle';
import SetHomeBtn from '../SetHomeBtn';
import styled from 'styled-components';
import { WeatherContext } from '../../../contexts/weatherContext';

// we'll fetch in Kelvin and convert on the fly in our components
// this will prevent render bugs due to refetching and rerendering
import { getImperial, getMetric } from '../../../custom-hooks/helpers/data';

const Background = styled.div`
	background-image: ${({ name }) =>
		`url(https://source.unsplash.com/random/1200x800?${
			name + (new Date().getHours() >= 19 ? ',night' : '') // append "night" to query if time > 7PM local
		})`};
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
	font-size: 16px;
	color: ghostwhite;
`;

const FeelsLike = styled.span`
	padding: 1em;
	font-size: 16px;
	color: ghostwhite;
`;

const CityName = styled.span`
	font-size: 30px;
	color: ghostwhite;
	padding-top: 1em;
`;

const Home = ({ widgetId }) => {
	const {
		name,
		temp,
		description,
		iconSrc,
		imperialOrMetric,
		feelsLike,
		cityName,
		error,
		// loading,
	} = useContext(WeatherContext);

	if (error) {
		console.log(error);
		return null;
	}

	const isImperial = imperialOrMetric === 'imperial';

	return (
		<>
			<Background name={name} />

			<Container>
				<Relief>
					<Temperature>
						{isNaN(temp)
							? ''
							: isImperial
							? getImperial(temp)
							: getMetric(temp)}
						<DegreeSymbol />
					</Temperature>

					<Description>{description}</Description>

					<IconContainer>
						<img src={iconSrc} alt={'weather-icon'} />
					</IconContainer>

					<FCToggle currentType={imperialOrMetric} />

					<FeelsLike>
						<em>feels like:</em>{' '}
						{isImperial
							? getImperial(feelsLike) + 'F'
							: getMetric(feelsLike) + 'C'}
					</FeelsLike>

					<CityName>{cityName}</CityName>

					<SetHomeBtn widgetId={widgetId} />
				</Relief>
			</Container>
		</>
	);
};

export default Home;

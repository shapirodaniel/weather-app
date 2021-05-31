import React from 'react';
import styled from 'styled-components';
import FCToggle from './FCToggle';

// we'll fetch in Kelvin and convert on the fly in our components
// this will prevent render bugs due to refetching and rerendering
import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

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

const FeelsLike = styled.span`
	padding: 1em;
	font-size: 16px;
	color: ghostwhite;
`;

const DateTime = styled.span`
	font-size: 18px;
	color: ghostwhite;
`;

const IconContainer = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
	// brightness filter punches up some of the washed-out open weather api icons like "mist"
	filter: brightness(150%);
`;

const Description = styled.span`
	font-size: 20px;
	color: ghostwhite;
`;

const CityName = styled.span`
	font-size: 30px;
	color: ghostwhite;
	padding-top: 1em;
	text-align: center;
`;

const CurrentWeather = ({
	temp,
	feelsLike,
	weatherDescription,
	weatherIcon,
	imperialOrMetric,
	isImperial,
	cityName,
	dateTime,
}) => (
	<>
		<DateTime>{dateTime}</DateTime>
		<div style={{ textAlign: 'center' }}>
			<Temperature>
				{isNaN(temp)
					? ''
					: isImperial
					? getImperialTemp(temp)
					: getMetricTemp(temp)}
				<DegreeSymbol />
			</Temperature>
			<FeelsLike>
				Feels like:{' '}
				{isImperial ? getImperialTemp(feelsLike) : getMetricTemp(feelsLike)}
				{'°'}
			</FeelsLike>
		</div>
		<div style={{ textAlign: 'center' }}>
			<IconContainer>
				<img src={weatherIcon} alt={'weather-icon'} />
			</IconContainer>
			<Description>{weatherDescription}</Description>
		</div>
		<FCToggle currentType={imperialOrMetric} />
		<CityName>{cityName}</CityName>
	</>
);

export default CurrentWeather;

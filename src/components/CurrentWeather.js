import React from 'react';
import styled from 'styled-components';
import FCToggle from './FCToggle';

// we'll fetch in Kelvin and convert on the fly in our components
// this will prevent render bugs due to refetching and rerendering
import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

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

const CurrentWeather = ({
	temp,
	feelsLike,
	weatherDescription,
	weatherIcon,
	imperialOrMetric,
	isImperial,
	cityName,
}) => (
	<>
		<Temperature>
			{isNaN(temp)
				? ''
				: isImperial
				? getImperialTemp(temp)
				: getMetricTemp(temp)}
			<DegreeSymbol />
		</Temperature>
		<Description>{weatherDescription}</Description>
		<IconContainer>
			<img src={weatherIcon} alt={'weather-icon'} />
		</IconContainer>
		<FCToggle currentType={imperialOrMetric} />
		<FeelsLike>
			<em>feels like:</em>{' '}
			{isImperial
				? getImperialTemp(feelsLike) + 'F'
				: getMetricTemp(feelsLike) + 'C'}
		</FeelsLike>
		<CityName>{cityName}</CityName>
	</>
);

export default CurrentWeather;

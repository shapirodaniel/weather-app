import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
	getImperialVisibility,
	getMetricVisibility,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Container = styled.div`
	width: 300px;
	margin-left: 1.3em;
	overflow: hidden;
`;

/* CURRENT DETAILS */

const CurrentDetails = ({ currentDetails }) => (
	<table>
		<tbody>
			<tr>
				<th>Current details</th>
			</tr>
			{currentDetails.map(([name, measure], idx) => (
				<tr key={idx}>
					<td style={{ padding: '.3em 0' }}>{name}</td>
					<td>{measure}</td>
				</tr>
			))}
		</tbody>
	</table>
);

/* SUN AND MOON */

const InnerBox = styled.div`
	& {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		padding: 2em 0;
	}
	& span:nth-child(2) {
		padding-left: 1em;
	}
	& div:last-child {
		opacity: 0.6;
		padding: 0.3em 0;
		font-size: 13px;
	}
`;

const Row = styled.div`
	display: flex;
	width: 100%;
	height: auto;
`;

const Section = styled.section`
	width: 100%;
	height: auto;
	margin-top: 2em;
	color: ghostwhite;
`;

const SunriseIcon = styled.span`
	& {
		font-size: 24px;
		filter: grayscale(100%) brightness(150%);
	}
	&::after {
		content: '☀️';
	}
`;

const SunsetIcon = styled.span`
	& {
		font-size: 20px;
		filter: grayscale(100%) brightness(150%);
	}
	&::after {
		content: '🌙';
	}
`;

const DateTime = styled.span`
	font-size: 18px;
`;

const SunAndMoon = ({ sunrise, sunset, moonrise, moonset, moonPhase }) => (
	<Section>
		<h2>{'Sunrise & Sunset'}</h2>
		<Row>
			<InnerBox>
				<span>
					<SunriseIcon />
					<DateTime>{sunrise}</DateTime>
				</span>
				<div>Dawn: {moonrise}</div>
			</InnerBox>
			<InnerBox>
				<span>
					<SunsetIcon />
					<DateTime>{sunset}</DateTime>
				</span>
				<div>Dusk: {moonset}</div>
			</InnerBox>
		</Row>
	</Section>
);

const DailyDetails = ({ daily, isImperial, visibility }) => {
	if (!daily) return null;

	const {
		dateTime,
		sunrise,
		sunset,
		moonrise,
		moonset,
		// adds moon phase icon and description
		moonPhase,
		morningTemp,
		dayTemp,
		eveningTemp,
		lowTemp,
		highTemp,
		feelsLikeMorning,
		feelsLikeDay,
		feelsLikeEvening,
		feelsLikeNight,
		pressure,
		humidity,
		dewPoint,
		cloudCover,
		uvIndex,

		windSpeed,
		windGust,
		windDirection,
		pop,
		rain,
		snow,
		weatherId,
		weatherType,
		weatherDescription,
		weatherIcon,
	} = daily[0];

	const currentDetails = [
		['Humidity', humidity],
		[
			'Dew point',
			isImperial
				? getImperialTemp(dewPoint) + '°F'
				: getMetricTemp(dewPoint) + '°C',
		],
		['Pressure', pressure],
		['UV index', uvIndex],
		[
			'Visibility',
			isImperial
				? getImperialVisibility(visibility) + ' mi'
				: getMetricVisibility(visibility) + ' km',
		],
	];

	return (
		<Container>
			<CurrentDetails currentDetails={currentDetails} />
			<SunAndMoon
				sunrise={sunrise}
				sunset={sunset}
				moonrise={moonrise}
				moonset={moonset}
			/>
		</Container>
	);
};

export default DailyDetails;

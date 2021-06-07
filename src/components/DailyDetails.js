import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import {
	getImperialTemp,
	getMetricTemp,
	getImperialVisibility,
	getMetricVisibility,
	getImperialWindSpeed,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Container = styled.div`
	width: 300px;
	margin-left: 1.3em;
	overflow-x: hidden;
`;

/* OUTLOOK */

const TempBox = ({ tempArray }) => {
	const [name, measure, feelsLikeName, feelsLikeMeasure] = tempArray;
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<span>{name}</span>
			<span>{measure}</span>
			<span>{feelsLikeName}</span>
			<span>{feelsLikeMeasure}</span>
		</div>
	);
};

const TempOverview = ({ overview }) => {
	const { morning, day, evening, night } = overview;

	return (
		<Section>
			<TempBox tempArray={morning} />
			<TempBox tempArray={day} />
			<TempBox tempArray={evening} />
			<TempBox tempArray={night} />
		</Section>
	);
};

/* CURRENT DETAILS */

const CurrentDetails = ({ currentDetails }) => (
	<Section>
		<h2>{'Current Conditions'}</h2>
		<table>
			<tbody>
				{currentDetails.map(([name, measure], idx) => (
					<tr key={idx}>
						<td style={{ padding: '.3em 0' }}>{name}</td>
						<td style={{ paddingLeft: '3em' }}>{measure}</td>
					</tr>
				))}
			</tbody>
		</table>
	</Section>
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
		padding-left: 0.3em;
	}
	& span :first-child {
		font-size: 20px;
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

const DateTime = styled.span`
	font-size: 18px;
`;

const SunAndMoon = ({ sunrise, sunset, moonrise, moonset, moonPhase }) => (
	<Section>
		<h2>{'Sunrise & Sunset'}</h2>
		<Row>
			<InnerBox>
				<span>
					<FontAwesomeIcon icon={faSun} />
					<DateTime>{sunrise}</DateTime>
				</span>
				<div>Dawn: {moonrise}</div>
			</InnerBox>
			<InnerBox>
				<span>
					<FontAwesomeIcon icon={faMoon} />
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
		nightTemp,
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
		[
			'Wind speed',
			isImperial
				? getImperialWindSpeed(windSpeed) + ' mph '
				: windSpeed + ' m/s',
		],
		['Direction', windDirection],
		[
			'Gust',
			isImperial ? getImperialWindSpeed(windGust) + ' mph' : windGust + ' m/s',
		],
		['Cloud cover', cloudCover],
	];

	const overview = {
		morning: [
			'Morning',
			isImperial
				? getImperialTemp(morningTemp) + '°F'
				: getMetricTemp(morningTemp) + '°C',
			'Feels Like',
			isImperial
				? getImperialTemp(feelsLikeMorning) + '°F'
				: getMetricTemp(feelsLikeMorning) + '°C',
		],
		day: [
			'Day',
			isImperial
				? getImperialTemp(dayTemp) + '°F'
				: getMetricTemp(dayTemp) + '°C',
			'Feels Like',
			isImperial
				? getImperialTemp(feelsLikeDay) + '°F'
				: getMetricTemp(feelsLikeDay) + '°C',
		],
		evening: [
			'Evening',
			isImperial
				? getImperialTemp(eveningTemp) + '°F'
				: getMetricTemp(eveningTemp) + '°C',
			'Feels Like',
			isImperial
				? getImperialTemp(feelsLikeEvening) + '°F'
				: getMetricTemp(feelsLikeEvening) + '°C',
		],
		night: [
			'Night',
			isImperial
				? getImperialTemp(nightTemp) + '°F'
				: getMetricTemp(nightTemp) + '°C',
			'Feels Like',
			isImperial
				? getImperialTemp(feelsLikeNight) + '°F'
				: getMetricTemp(feelsLikeNight) + '°C',
		],
	};

	return (
		<Container>
			<TempOverview overview={overview} />
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

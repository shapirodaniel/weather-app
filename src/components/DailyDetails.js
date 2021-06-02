import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Table = styled.table`
	margin-left: 6em;
`;

const DailyDetails = ({ daily, isImperial }) => {
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

	return (
		<Table style={{ color: 'white' }}>
			<tbody>
				{[
					dateTime,
					sunrise,
					sunset,
					moonrise,
					moonset,
					// adds moon phase icon and description
					moonPhase.icon || '',
					moonPhase.description || '',
					isImperial
						? getImperialTemp(morningTemp) + 'F'
						: getMetricTemp(morningTemp) + 'C',
					isImperial
						? getImperialTemp(dayTemp) + 'F'
						: getMetricTemp(dayTemp) + 'C',
					isImperial
						? getImperialTemp(eveningTemp) + 'F'
						: getMetricTemp(eveningTemp) + 'C',
					isImperial
						? getImperialTemp(lowTemp) + 'F'
						: getMetricTemp(lowTemp) + 'C',
					isImperial
						? getImperialTemp(highTemp) + 'F'
						: getMetricTemp(highTemp) + 'C',
					isImperial
						? getImperialTemp(feelsLikeMorning) + 'F'
						: getMetricTemp(feelsLikeMorning) + 'C',
					isImperial
						? getImperialTemp(feelsLikeDay) + 'F'
						: getMetricTemp(feelsLikeDay) + 'C',
					isImperial
						? getImperialTemp(feelsLikeEvening) + 'F'
						: getMetricTemp(feelsLikeEvening) + 'C',
					isImperial
						? getImperialTemp(feelsLikeNight) + 'F'
						: getMetricTemp(feelsLikeNight) + 'C',
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
				].map((val, idx) => (
					<tr key={idx}>
						<td>{val}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default DailyDetails;

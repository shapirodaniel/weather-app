import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
	margin-left: 6em;
`;

const DailyDetails = ({ daily }) => {
	if (!daily) return null;

	const {
		dateTime,
		sunrise,
		sunset,
		moonrise,
		moonset,
		// adds moon phase icon and description
		// moonPhase,
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
					// moonPhase,
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

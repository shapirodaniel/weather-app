import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Table = styled.table`
	margin: 0 auto;
`;

const Hour = styled.td`
	font-weight: 500;
	color: ghostwhite;
`;

const Icon = styled.img`
	height: 36px;
	width: 36px;
	filter: brightness(150%);
`;

const WeatherType = styled.td`
	font-weight: normal;
	color: ghostwhite;
`;

const Temp = styled.td`
	font-weight: normal;
	color: ghostwhite;
`;

const Today = ({ hourly, isImperial }) => {
	if (!hourly) return null;

	return (
		<Table>
			<tbody>
				{hourly.map(({ dateTime, temp, weatherType, weatherIcon }, idx) => (
					<tr key={idx}>
						<Hour>{dateTime.replace(/:00/g, '')}</Hour>
						<td>
							<Icon src={weatherIcon} alt={'weather-icon'} />
						</td>
						<WeatherType>{weatherType}</WeatherType>
						<Temp>
							{(isNaN(temp)
								? ''
								: isImperial
								? getImperialTemp(temp)
								: getMetricTemp(temp)) +
								'°' +
								(isImperial ? ' F' : ' C')}
						</Temp>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
export default Today;

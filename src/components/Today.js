import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Table = styled.table``;

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
				{hourly.map((forecast, idx) => {
					const { dateTime, temp, weatherType, weatherIcon } = forecast;

					// unpack [DATE_LONG, TIME_SIMPLE] array for 12:00 AM
					let dateLong, dateTimeSimple;
					if (Array.isArray(dateTime)) {
						dateLong = dateTime[0];
						dateTimeSimple = dateTime[1];
					}

					return (
						<React.Fragment key={idx}>
							{dateLong && (
								<tr>
									<Hour>{dateLong}</Hour>
								</tr>
							)}
							<tr>
								<Hour>
									{dateTimeSimple
										? dateTimeSimple.replace(/:00/g, '')
										: dateTime.replace(/:00/g, '')}
								</Hour>
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
						</React.Fragment>
					);
				})}
			</tbody>
		</Table>
	);
};
export default Today;

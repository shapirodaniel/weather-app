import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

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

const Container = styled.div`
	width: 300px;
	margin-left: 1.3em;
	padding-right: 0.3em;
	overflow-x: hidden;
	color: ghostwhite;
`;

const Today = ({ hourly, isImperial }) => {
	if (!hourly) return null;

	return (
		<Container>
			<h2>48-Hr Forecast</h2>
			<table style={{ width: '90%' }}>
				<tbody>
					<tr>
						<Hour
							style={{
								paddingBottom: '.3em',
								borderBottom: '1px solid ghostwhite',
								fontSize: '18px',
							}}
							colSpan={3}
						>
							Today
						</Hour>
					</tr>
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
										<Hour
											style={{
												paddingTop: '2em',
												paddingBottom: '.3em',
												borderBottom: '1px solid ghostwhite',
												fontSize: '18px',
											}}
											colSpan={3}
										>
											{dateLong}
										</Hour>
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
			</table>
		</Container>
	);
};
export default Today;

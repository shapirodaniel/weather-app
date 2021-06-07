import React from 'react';
import styled from 'styled-components';
import TableLayout from './TableLayout';

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

const Today = ({ hourly, isImperial }) => {
	if (!hourly) return null;

	return (
		<TableLayout title={'48-hr Forecast'}>
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
							<WeatherType>{weatherType}</WeatherType>
							<td>
								<Icon src={weatherIcon} alt={'weather-icon'} />
							</td>
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
		</TableLayout>
	);
};
export default Today;

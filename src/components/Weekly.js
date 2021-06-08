import React from 'react';
import styled from 'styled-components';

import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

const Container = styled.div`
	width: 300px;
	margin-left: 1.3em;
	overflow-x: hidden;
	color: ghostwhite;
	/* display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between; */
`;

const Row = styled.div`
	width: 93%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #a1a1a1;
	padding: 0.3em 0;
`;

const Box = ({ dateTime, weatherType }) => (
	<div style={{ fontSize: '14px' }}>
		<div>{dateTime}</div>
		<div style={{ opacity: '.6' }}>{weatherType}</div>
	</div>
);

const TempBox = ({ highTemp, lowTemp }) => (
	<div>
		<div>{highTemp}</div>
		<div style={{ opacity: '.6' }}>{lowTemp}</div>
	</div>
);

const Weekly = ({ weekly, isImperial }) => {
	if (!weekly) return null;

	// filter important info from weekly forecast details
	const relevant = weekly.map(
		({ highTemp, lowTemp, dateTime, weatherType, weatherIcon, pop }) => ({
			highTemp,
			lowTemp,
			dateTime,
			weatherType,
			weatherIcon,
			pop,
		})
	);

	return (
		<Container>
			<h2>7-Day Forecast</h2>
			{relevant.map(
				(
					{ highTemp, lowTemp, dateTime, weatherType, weatherIcon, pop },
					idx
				) => (
					<Row key={idx}>
						<Box dateTime={dateTime} weatherType={weatherType} />

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div>{+pop.slice(0, -1) === 0 ? '' : pop}</div>
							<img
								src={weatherIcon}
								alt={'weather-icon'}
								style={{
									height: '60px',
									width: '60px',
									objectFit: 'contain',
									marginRight: '.3em',
									// punch up weather icons
									filter: 'brightness(150%)',
								}}
							/>
							<TempBox
								highTemp={
									isImperial
										? getImperialTemp(highTemp) + '°F'
										: getMetricTemp(highTemp) + '°C'
								}
								lowTemp={
									isImperial
										? getImperialTemp(lowTemp) + '°F'
										: getMetricTemp(lowTemp) + '°C'
								}
							/>
						</div>
					</Row>
				)
			)}
		</Container>
	);
};

export default Weekly;

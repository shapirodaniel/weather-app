import React, { useContext } from 'react';
import { WeatherContext } from '../../../contexts/weatherContext';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	margin: 0 auto;
`;

const Button = styled.div`
	& {
		padding: 1em;
		border: 1px solid white;
		color: ${({ isActive }) => (isActive ? 'inherit' : 'var(--lightAccent)')};
		background-color: ${({ isActive }) =>
			isActive ? 'ghostwhite' : 'inherit'};
		cursor: pointer;
		font-size: 16px;
		font-weight: 700;
	}

	&:first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	&:last-child {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
`;

// we'll map over an array of buttons to avoid repetition in our jsx
const buttons = [
	{ id: 1, type: 'imperial', value: 'F' },
	{ id: 2, type: 'metric', value: 'C' },
];

const FCToggle = ({ currentType }) => {
	const { updateUnits, imperialOrMetric, cityName } =
		useContext(WeatherContext);

	return (
		<Container>
			{buttons.map(({ id, type, value }) => (
				<Button
					key={id}
					isActive={imperialOrMetric === type}
					onClick={() => {
						// first, we'll store our new config in localStorage
						localStorage.setItem(
							'weatherConfig',
							JSON.stringify({
								imperialOrMetric: type,
								cityName,
							})
						);
						// then we'll call our dispatch-wrapped action creator
						updateUnits(type);
					}}
				>
					{value}
				</Button>
			))}
		</Container>
	);
};

export default FCToggle;

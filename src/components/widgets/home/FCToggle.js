import React from 'react';
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
		font-weight: 500;
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

const buttons = [
	{ id: 1, type: 'imperial', value: 'F' },
	{ id: 2, type: 'metric', value: 'C' },
];

const FCToggle = ({ currentType, toggleType }) => {
	return (
		<Container>
			{buttons.map(({ id, type, value }) => (
				<Button
					key={id}
					isActive={currentType === type}
					onClick={() => {
						toggleType(type);
						localStorage.setItem('imperialOrMetric', type);
					}}
				>
					{value}
				</Button>
			))}
		</Container>
	);
};

export default FCToggle;
